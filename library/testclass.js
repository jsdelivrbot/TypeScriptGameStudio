"use strict";
/**
* Renderable is the base of all objects that can be displayed on the screen.  At its most simple
* level, a Renderable is simply a function (<code>onRender</code>), and a flag to indicate whether
* the object is currently active and enabled, or disabled.
*/
class Renderable {
    constructor() {
        /// Track if the object is currently allowed to be rendered.
        /// When it is false, we don't run any updates on the object
        this.mEnabled = true;
    }
    /**
    * Specify whether this Renderable object is enabled or disabled.  When it is disabled, it
    * effectively does not exist in the game.
    *
    * @param val The new state (true for enabled, false for disabled)
    */
    setEnabled(val) {
        this.mEnabled = val;
    }
    /**
    * Return the current enabled/disabled state of this Renderable
    *
    * @return The state of the renderable
    */
    getEnabled() {
        return this.mEnabled;
    }
    /**
    * Render something to the screen.  This doesn't do the actual rendering,
    * instead it forwards to the onRender function, but only if the object
    * is enabled.
    */
    render() {
        if (!this.mEnabled)
            return;
        this.onRender();
    }
}
/// <reference path="./Renderable.ts"/>
/**
* BaseActor is the parent of all Actor types.
*
* We use BaseActor as parent of both WorldActor (MainScene) and SceneActor (all other scenes), so that
* core functionality (physics, animation) can be in one place, even though many of the features of
* an WorldActor (MainScene) require a Score object, and are thus incompatible with non-Main scenes.
*/
class BaseActor extends Renderable {
    constructor(scene, imgName, width, height) {
        super();
        this.mScene = scene;
        this.mSize = new PhysicsType2d.Vector2(width, height);
        this.mZIndex = 0;
        this.mInfoText = "";
        if (imgName === "") {
            this.mSprite = new PIXI.Sprite();
            this.mSprite.texture = PIXI.Texture.EMPTY;
        }
        else {
            this.mSprite = new PIXI.Sprite(PIXI.loader.resources[imgName].texture);
        }
        this.mSprite.width = this.mSize.x;
        this.mSprite.height = this.mSize.y;
        this.mSprite.anchor.x = 0.5;
        this.mSprite.anchor.y = 0.5;
    }
    /**
    * Specify that this actor should have a rectangular physics shape
    *
    * @param type Is the actor's body static or dynamic?
    * @param x    The X coordinate of the bottom left corner, in meters
    * @param y    The Y coordinate of the bottom left corner, in meters
    */
    setBoxPhysics(type, x, y) {
        let shape = new PhysicsType2d.Collision.Shapes.PolygonShape();
        shape.SetAsBoxAtOrigin(this.mSize.x / 2, this.mSize.y / 2);
        let boxBodyDef = new PhysicsType2d.Dynamics.BodyDefinition();
        boxBodyDef.type = type;
        boxBodyDef.position.x = x + this.mSize.x / 2;
        boxBodyDef.position.y = y + this.mSize.y / 2;
        this.mBody = this.mScene.mWorld.CreateBody(boxBodyDef);
        let fd = new PhysicsType2d.Dynamics.FixtureDefinition();
        fd.shape = shape;
        // fd.density = 0;
        // fd.friction = 0;
        // fd.restitution = 0;
        this.mBody.CreateFixtureFromDefinition(fd);
        //no shape.dispose()
        this.setPhysics(0, 0, 0);
        this.mBody.SetUserData(this);
        // remember this is a box
        this.mIsCircleBody = false;
        this.mIsBoxBody = true;
        this.mIsPolygonBody = false;
    }
    /**
    * Specify that this actor should have a polygon physics shape.
    * <p>
    * You must take extreme care when using this method. Polygon vertices must be given in
    * counter-clockwise order, and they must describe a convex shape.
    *
    * @param type     Is the actor's body static or dynamic?
    * @param x        The X coordinate of the bottom left corner, in meters
    * @param y        The Y coordinate of the bottom left corner, in meters
    * @param vertices Up to 16 coordinates representing the vertexes of this polygon, listed as
    *                 x0,y0,x1,y1,x2,y2,...
    */
    setPolygonPhysics(type, x, y, vertices) {
        let shape = new PhysicsType2d.Collision.Shapes.PolygonShape();
        let verts = new Array(vertices.length / 2);
        for (let i = 0; i < vertices.length; i += 2)
            verts[i / 2] = new PhysicsType2d.Vector2(vertices[i], vertices[i + 1]);
        // print some debug info, since vertices are tricky
        //for (let vert of verts)
        //Lol.message(mScene.mConfig, "vert", "at " + vert.x + "," + vert.y);
        shape.Set(verts);
        let boxBodyDef = new PhysicsType2d.Dynamics.BodyDefinition();
        boxBodyDef.type = type;
        boxBodyDef.position.x = x + this.mSize.x / 2;
        boxBodyDef.position.y = y + this.mSize.y / 2;
        this.mBody = this.mScene.mWorld.CreateBody(boxBodyDef);
        let fd = new PhysicsType2d.Dynamics.FixtureDefinition();
        fd.shape = shape;
        //fd.density = 0;
        //fd.friction = 0;
        //fd.restitution = 0;
        this.mBody.CreateFixtureFromDefinition(fd);
        this.setPhysics(0, 0, 0);
        //no shape.dispose()
        // link the body to the actor
        this.mBody.SetUserData(this);
        // remember this is a polygon
        this.mIsCircleBody = false;
        this.mIsBoxBody = false;
        this.mIsPolygonBody = true;
    }
    /**
    * Specify that this actor should have a circular physics shape
    *
    * @param type   Is the actor's body static or dynamic?
    * @param x      The X coordinate of the bottom left corner, in meters
    * @param y      The Y coordinate of the bottom left corner, in meters
    * @param radius The radius of the underlying circle
    */
    setCirclePhysics(type, x, y, radius) {
        let shape = new PhysicsType2d.Collision.Shapes.CircleShape();
        shape.m_radius = radius;
        let boxBodyDef = new PhysicsType2d.Dynamics.BodyDefinition();
        boxBodyDef.type = type;
        boxBodyDef.position.x = x + this.mSize.x / 2;
        boxBodyDef.position.y = y + this.mSize.y / 2;
        this.mBody = this.mScene.mWorld.CreateBody(boxBodyDef);
        let fd = new PhysicsType2d.Dynamics.FixtureDefinition();
        fd.shape = shape;
        // fd.density = 0;
        // fd.friction = 0;
        // fd.restitution = 0;
        this.mBody.CreateFixtureFromDefinition(fd);
        //no shape.dispose()
        this.setPhysics(0, 0, 0);
        // link the body to the actor
        this.mBody.SetUserData(this);
        // remember this is a circle
        this.mIsCircleBody = true;
        this.mIsBoxBody = false;
        this.mIsPolygonBody = false;
    }
    /**
    * Indicate whether this actor is fast-moving, so that the physics simulator can do a better job
    * dealing with tunneling effects.
    *
    * @param state True or false, depending on whether it is fast-moving or not
    */
    setFastMoving(state) {
        this.mBody.SetBullet(state);
    }
    /**
    * Internal method for updating an actor's velocity
    * <p>
    * We use this because we need to be careful about possibly breaking joints when we make the
    * actor move
    *
    * @param x The new x velocity
    * @param y The new y velocity
    */
    updateVelocity(x, y) {
        // make sure it is not static... heroes are already Dynamic, let's just set everything else
        // that is static to kinematic... that's probably safest.
        if (this.mBody.GetType() == PhysicsType2d.Dynamics.BodyType.STATIC) {
            this.mBody.SetType(PhysicsType2d.Dynamics.BodyType.KINEMATIC);
        }
        this.breakJoints();
        this.mBody.SetLinearVelocity(new PhysicsType2d.Vector2(x, y));
    }
    /**
    * Break any joints that involve this actor, so that it can move freely.
    * <p>
    * NB: BaseActors don't have any joints to break, but classes that derive from BaseActor do
    */
    breakJoints() {
    }
    // /**
    //  * When this actor is touched, play its mTouchSound and then execute its mTapHandler
    //  *
    //  * @param touchVec The coordinates of the touch, in meters
    //  * @return True if the event was handled, false otherwise
    //  */
    // boolean onTap(Vector3 touchVec) {
    //     if (mTouchSound != null)
    //         mTouchSound.play(Lol.getGameFact(mScene.mConfig, "volume", 1));
    //     return mTapHandler != null && mTapHandler.go(touchVec.x, touchVec.y);
    // }
    /**
    * Every time the world advances by a timestep, we call this code to update the actor route and
    * animation, and then draw the actor
    *
    * @param sb    The spritebatch to use in order to draw this actor
    * @param delta The amount of time since the last render event
    */
    //@Override
    onRender() {
        if (this.mRoute)
            this.mRoute.drive();
        if (this.mBody)
            this.mSprite.position.x = this.mBody.GetPosition().x;
        if (this.mBody)
            this.mSprite.position.y = this.mBody.GetPosition().y;
        if (this.mBody)
            this.mSprite.rotation = this.mBody.GetAngle();
    }
    /**
    * Indicate whether this actor engages in physics collisions or not
    *
    * @param state True or false, depending on whether the actor will participate in physics
    *              collisions or not
    */
    setCollisionsEnabled(state) {
        // The default is for all fixtures of a actor have the same sensor state
        let fixtures = this.mBody.GetFixtures();
        while (fixtures.MoveNext()) {
            fixtures.Current().SetSensor(!state);
        }
        fixtures.Reset();
    }
    /**
    * Adjust the default physics settings (density, elasticity, friction) for this actor
    *
    * @param density    New density of the actor
    * @param elasticity New elasticity of the actor
    * @param friction   New friction of the actor
    */
    setPhysics(density, elasticity, friction) {
        let fixtures = this.mBody.GetFixtures();
        while (fixtures.MoveNext()) {
            let f = fixtures.Current();
            f.SetDensity(density);
            f.SetRestitution(elasticity);
            f.SetFriction(friction);
        }
        fixtures.Reset();
        this.mBody.ResetMassData();
    }
    /**
    * Indicate that this actor should be immune to the force of gravity
    */
    setGravityDefy() {
        this.mBody.SetGravityScale(0);
    }
    /**
    * Ensure that an actor is subject to gravitational forces.
    * <p>
    * By default, non-hero actors are not subject to gravity or forces until they are given a path,
    * velocity, or other form of motion. This lets an actor be subject to forces.  In practice,
    * using this in a side-scroller means the actor will fall to the ground.
    */
    setCanFall() {
        this.mBody.SetType(PhysicsType2d.Dynamics.BodyType.DYNAMIC);
    }
    /**
    * Force an actor to have a Kinematic body type.  Kinematic bodies can move, but are not subject
    * to forces in the same way as Dynamic bodies.
    */
    setKinematic() {
        if (this.mBody.GetType() != PhysicsType2d.Dynamics.BodyType.KINEMATIC)
            this.mBody.SetType(PhysicsType2d.Dynamics.BodyType.KINEMATIC);
    }
    /**
    * Retrieve any additional text information for this actor
    *
    * @return The string that the programmer provided
    */
    getInfoText() {
        return this.mInfoText;
    }
    /**
    * Retrieve any additional numerical information for this actor
    *
    * @return The integer that the programmer provided
    */
    getInfoInt() {
        return this.mInfoInt;
    }
    /**
    * Set additional text information for this actor
    *
    * @param text Text to attach to the actor
    */
    setInfoText(text) {
        this.mInfoText = text;
    }
    /**
    * Set additional numerical information for this actor
    *
    * @param newVal An integer to attach to the actor
    */
    setInfoInt(newVal) {
        this.mInfoInt = newVal;
    }
    /**
    * Returns the X coordinate of this actor
    *
    * @return x coordinate of top left corner, in pixels
    */
    getXPosition() {
        return this.mBody.GetPosition().x - this.mSize.x / 2;
    }
    /**
    * Returns the Y coordinate of this actor
    *
    * @return y coordinate of top left corner, in pixels
    */
    getYPosition() {
        return this.mBody.GetPosition().y - this.mSize.y / 2;
    }
    /**
    * Change the position of an actor
    *
    * @param x The new X position, in meters
    * @param y The new Y position, in meters
    */
    setPosition(x, y) {
        this.mBody.SetTransform(new PhysicsType2d.Vector2(x + this.mSize.x / 2, y + this.mSize.y / 2), this.mBody.GetAngle());
    }
    /**
    * Returns the width of this actor
    *
    * @return the actor's width, in meters
    */
    getWidth() {
        return this.mSize.x;
    }
    /**
    * Return the height of this actor
    *
    * @return the actor's height, in meters
    */
    getHeight() {
        return this.mSize.y;
    }
    /**
    * Change the size of an actor, and/or change its position
    *
    * @param x      The new X coordinate of its bottom left corner, in meters
    * @param y      The new Y coordinate of its bototm left corner, in meters
    * @param width  The new width of the actor, in meters
    * @param height The new height of the actor, in meters
    */
    resize(x, y, width, height) {
        // set new height and width
        this.mSize.Set(width, height);
        // read old body information
        let oldBody = this.mBody;
        let oldFix = oldBody.GetFixtures().Current();
        // make a new body
        if (this.mIsCircleBody) {
            this.setCirclePhysics(oldBody.GetType(), x, y, (width > height) ? width / 2 : height / 2);
        }
        else if (this.mIsBoxBody) {
            this.setBoxPhysics(oldBody.GetType(), x, y);
        }
        else if (this.mIsPolygonBody) {
            // we need to manually scale all the vertices
            let xScale = height / this.mSize.y;
            let yScale = width / this.mSize.x;
            let ps = oldFix.GetShape();
            let verts = new Array(ps.GetChildCount() * 2); //TEST: GetChildCount == GetVertexCount ??
            for (let i = 0; i < ps.GetChildCount(); ++i) {
                let mTempVector = ps.GetVertex(i);
                verts[2 * i] = mTempVector.x * xScale;
                verts[2 * i + 1] = mTempVector.y * yScale;
            }
            this.setPolygonPhysics(oldBody.GetType(), x, y, verts);
        }
        // Update the user-visible physics values
        this.setPhysics(oldFix.GetDensity(), oldFix.GetRestitution(), oldFix.GetFriction());
        this.setFastMoving(oldBody.IsBullet());
        // clone forces
        this.mBody.SetAngularVelocity(oldBody.GetAngularVelocity());
        this.mBody.SetTransform(this.mBody.GetPosition(), oldBody.GetAngle());
        this.mBody.SetGravityScale(oldBody.GetGravityScale());
        this.mBody.SetLinearDamping(oldBody.GetLinearDamping());
        this.mBody.SetLinearVelocity(oldBody.GetLinearVelocity());
        // disable the old body
        oldBody.SetActive(false);
    }
    /**
    * Use this to find the current rotation of an actor
    *
    * @return The rotation, in radians
    */
    getRotation() {
        return this.mBody.GetAngle();
    }
    /**
    * Call this on an actor to rotate it. Note that this works best on boxes.
    *
    * @param rotation amount to rotate the actor (in radians)
    */
    setRotation(rotation) {
        this.mBody.SetTransform(this.mBody.GetPosition(), rotation);
    }
    /**
    * Make the actor continuously rotate. This is usually only useful for fixed objects.
    *
    * @param duration Time it takes to complete one rotation
    */
    setRotationSpeed(duration) {
        if (this.mBody.GetType() == PhysicsType2d.Dynamics.BodyType.STATIC)
            this.mBody.SetType(PhysicsType2d.Dynamics.BodyType.KINEMATIC);
        this.mBody.SetAngularVelocity(duration);
    }
    /**
    * Indicate that this actor should not rotate due to torque
    */
    disableRotation() {
        this.mBody.SetFixedRotation(true);
    }
    /**
    * Make an actor disappear
    *
    * @param quiet True if the disappear sound should not be played
    */
    remove(quiet) {
        // set it invisible immediately, so that future calls know to ignore this actor
        this.mEnabled = false;
        this.mBody.SetActive(false);
        this.mSprite.visible = false;
        // play a sound when we remove this actor?
        if (this.mDisappearSound && !quiet)
            this.mDisappearSound.play();
        // To do a disappear animation after we've removed the actor, we draw an actor, so that
        // we have a clean hook into the animation system, but we disable its physics
        //  if (this.mDisappearAnimation != null) {
        //      float x = getXPosition() + mDisappearAnimateOffset.x;
        //      float y = getYPosition() + mDisappearAnimateOffset.y;
        //      BaseActor o = new BaseActor(mScene, "", mDisappearAnimateSize.x, mDisappearAnimateSize.y);
        //      o.setBoxPhysics(BodyDef.BodyType.StaticBody, x, y);
        //      mScene.addActor(o, 0);
        //      o.mBody.setActive(false);
        //      o.setDefaultAnimation(mDisappearAnimation);
        //  }
    }
    /**
    * Returns the X velocity of of this actor
    *
    * @return Velocity in X dimension, in meters per second
    */
    getXVelocity() {
        return this.mBody.GetLinearVelocity().x;
    }
    /**
    * Returns the Y velocity of of this actor
    *
    * @return Velocity in Y dimension, in meters per second
    */
    getYVelocity() {
        return this.mBody.GetLinearVelocity().y;
    }
    /**
    * Add velocity to this actor
    *
    * @param x Velocity in X dimension, in meters per second
    * @param y Velocity in Y dimension, in meters per second
    */
    addVelocity(x, y) {
        // ensure this is a moveable actor
        if (this.mBody.GetType() == PhysicsType2d.Dynamics.BodyType.STATIC)
            this.mBody.SetType(PhysicsType2d.Dynamics.BodyType.DYNAMIC);
        // Add to the velocity of the actor
        let v = this.mBody.GetLinearVelocity();
        v.x += x;
        v.y += y;
        this.updateVelocity(v.x, v.y);
        // Disable sensor, or else this actor will go right through walls
        this.setCollisionsEnabled(true);
    }
    /**
    * Set the absolute velocity of this actor
    *
    * @param x Velocity in X dimension, in meters per second
    * @param y Velocity in Y dimension, in meters per second
    */
    setAbsoluteVelocity(x, y) {
        // ensure this is a moveable actor
        if (this.mBody.GetType() == PhysicsType2d.Dynamics.BodyType.STATIC)
            this.mBody.SetType(PhysicsType2d.Dynamics.BodyType.DYNAMIC);
        // change its velocity
        this.updateVelocity(x, y);
        // Disable sensor, or else this actor will go right through walls
        this.setCollisionsEnabled(true);
    }
    /**
    * Set a dampening factor to cause a moving body to slow down without colliding with anything
    *
    * @param amount The amount of damping to apply
    */
    setDamping(amount) {
        this.mBody.SetLinearDamping(amount);
    }
    /**
    * Set a dampening factor to cause a spinning body to decrease its rate of spin
    *
    * @param amount The amount of damping to apply
    */
    setAngularDamping(amount) {
        this.mBody.SetAngularDamping(amount);
    }
    //  /**
    //   * Specify some code to run when this actor is tapped
    //   *
    //   * @param handler The TouchEventHandler to run in response to the tap
    //   */
    //  public void setTapCallback(TouchEventHandler handler) {
    //      mTapHandler = handler;
    //  }
    //  /**
    //   * Specify some code to run while this actor is down-pressed and when it is released
    //   *
    //   * @param whileDownAction The code to run for as long as the actor is being pressed
    //   * @param onUpAction      The code to run when the actor is released
    //   */
    //  public void setToggleCallback(final LolAction whileDownAction, final LolAction onUpAction) {
    //      whileDownAction.mIsActive = false;
    //
    //      // set up the toggle behavior
    //      mToggleHandler = new ToggleEventHandler() {
    //          public boolean go(boolean isUp, float worldX, float worldY) {
    //              if (isUp) {
    //                  whileDownAction.mIsActive = false;
    //                  if (onUpAction != null)
    //                      onUpAction.go();
    //              } else {
    //                  whileDownAction.mIsActive = true;
    //              }
    //              return true;
    //          }
    //      };
    //      mScene.mRepeatEvents.add(whileDownAction);
    //  }
    /**
    * Request that this actor moves according to a fixed route
    *
    * @param route    The route to follow
    * @param velocity speed at which to travel along the route
    * @param loop     When the route completes, should we start it over again?
    */
    setRoute(route, velocity, loop) {
        // This must be a KinematicBody or a Dynamic Body!
        if (this.mBody.GetType() == PhysicsType2d.Dynamics.BodyType.STATIC) {
            this.mBody.SetType(PhysicsType2d.Dynamics.BodyType.KINEMATIC);
        }
        // Create a Driver to advance the actor's position according to the route
        this.mRoute = new Route.Driver(route, velocity, loop, this);
    }
    //  /**
    //   * Request that a sound plays whenever the player touches this actor
    //   *
    //   * @param sound The name of the sound file to play
    //   */
    //  public void setTouchSound(String sound) {
    //      mTouchSound = mScene.mMedia.getSound(sound);
    //  }
    /**
     * Request that a sound plays whenever this actor disappears
     *
     * @param soundName The name of the sound file to play
     */
    setDisappearSound(soundName) {
        this.mDisappearSound = this.mScene.mMedia.getSound(soundName);
    }
    /**
    * Change the image being used to display the actor
    *
    * @param imgName The name of the new image file to use
    */
    setImage(imgName) {
        //mAnimator.updateImage(mScene.mMedia, imgName);
        this.mSprite = new PIXI.Sprite(PIXI.loader.resources[imgName].texture);
    }
    /**
    * Set the z plane for this actor
    *
    * @param zIndex The z plane. Values range from -2 to 2. The default is 0.
    */
    setZIndex(zIndex) {
        // Coerce index into legal range, then move it
        zIndex = (zIndex < -2) ? -2 : zIndex;
        zIndex = (zIndex > 2) ? 2 : zIndex;
        this.mScene.removeActor(this, this.mZIndex);
        this.mZIndex = zIndex;
        this.mScene.addActor(this, this.mZIndex);
    }
    //  /**
    //   * Set the default animation sequence for this actor, and start playing it
    //   *
    //   * @param animation The animation to display
    //   */
    //  public void setDefaultAnimation(Animation animation) {
    //      mDefaultAnimation = animation;
    //      mAnimator.setCurrentAnimation(mDefaultAnimation);
    //  }
    //
    //  /**
    //   * Set the animation sequence to use when the actor is moving in the negative X direction
    //   *
    //   * @param animation The animation to display
    //   */
    //  public void setDefaultReverseAnimation(Animation animation) {
    //      mDefaultReverseAnimation = animation;
    //  }
    //  /**
    //   * Set the animation sequence to use when the actor is removed from the world
    //   *
    //   * @param animation The animation to display
    //   * @param offsetX   Distance between the animation and the left side of the actor
    //   * @param offsetY   Distance between the animation and the bottom of the actor
    //   * @param width     The width of the animation, in case it's not the same as the actor width
    //   * @param height    The height of the animation, in case it's not the same as the actor height
    //   */
    //  public void setDisappearAnimation(Animation animation, float offsetX, float offsetY, float width, float height) {
    //      mDisappearAnimation = animation;
    //      mDisappearAnimateOffset.set(offsetX, offsetY);
    //      mDisappearAnimateSize.set(width, height);
    //  }
    /**
    * Set a time that should pass before this actor appears on the screen
    *
    * @param delay How long to wait before displaying the actor, in milliseconds
    */
    //TODO: Timer vs setTimeout?
    setAppearDelay(delay) {
        this.mEnabled = false;
        this.mBody.SetActive(false);
        setTimeout(() => {
            this.mEnabled = true;
            this.mBody.SetActive(true);
        }, delay);
    }
    /**
    * Request that this actor disappear after a specified amount of time
    *
    * @param delay How long to wait before hiding the actor, in milliseconds
    * @param quiet Should the item should disappear quietly, or play its disappear sound?
    */
    setDisappearDelay(delay, quiet) {
        setTimeout(() => {
            this.remove(quiet);
        }, delay);
    }
    //  /**
    //   * Indicate that this actor should shrink over time.  Note that using negative values will lead
    //   * to growing instead of shrinking.
    //   *
    //   * @param shrinkX      The number of meters by which the X dimension should shrink each second
    //   * @param shrinkY      The number of meters by which the Y dimension should shrink each second
    //   * @param keepCentered Should the actor's center point stay the same as it shrinks, or should
    //   *                     its bottom left corner stay in the same position
    //   */
    //  public void setShrinkOverTime(final float shrinkX, final float shrinkY, final boolean keepCentered) {
    //      // NB: we shrink 20 times per second
    //      final Timer.Task t = new Timer.Task() {
    //          @Override
    //          public void run() {
    //              if (mEnabled) {
    //                  float x, y;
    //                  if (keepCentered) {
    //                      x = getXPosition() + shrinkX / 20 / 2;
    //                      y = getYPosition() + shrinkY / 20 / 2;
    //                  } else {
    //                      x = getXPosition();
    //                      y = getYPosition();
    //                  }
    //                  float w = mSize.x - shrinkX / 20;
    //                  float h = mSize.y - shrinkY / 20;
    //                  // if the area remains >0, resize it and schedule a timer to run again
    //                  if ((w > 0.05f) && (h > 0.05f)) {
    //                      resize(x, y, w, h);
    //                      Timer.schedule(this, .05f);
    //                  } else {
    //                      remove(false);
    //                  }
    //              }
    //          }
    //      };
    //      Timer.schedule(t, .05f);
    //  }
    /**
    * Indicate that this actor's rotation should change in response to its direction of motion
    */
    setRotationByDirection() {
        let out_this = this;
        this.mScene.mRepeatEvents.push(new (class _ extends LolAction {
            //@Override
            go() {
                if (out_this.mEnabled) {
                    let x = out_this.mBody.GetLinearVelocity().x;
                    let y = out_this.mBody.GetLinearVelocity().y;
                    let angle = Math.atan2(y, x) + Math.atan2(-1, 0);
                    out_this.mBody.SetTransform(out_this.mBody.GetPosition(), angle);
                }
            }
        })());
    }
}
// TODO: Right now the camera can only follow an actor
// The Camera is essentially a wrapper for a pixi Container
// which could contain an actor to chase
// and the scene it is acting as a camera for
class Camera {
    constructor(x, y) {
        this.mContainer = new PIXI.Container();
        this.mWidth = x;
        this.mHeight = y;
        //this.mContainer.position.x = x;
        //this.mContainer.position.y = y;
    }
    // changeScene(scene: Scene) {
    //   this.mContainer.removeChildren();
    //   this.mScene = scene;
    //   this.mContainer.addChild(scene.mContainer);
    // }
    setPosition(x, y) {
        this.mContainer.position.x = x; // - this.mWidth / 2;
        this.mContainer.position.y = y; // - this.mHeight / 2;
    }
    centerOn(x, y) {
        this.mContainer.pivot.x = x; // - this.mWidth / 2;
        this.mContainer.pivot.y = y; // - this.mHeight / 2;
    }
    // updatePosition() {
    //   this.mContainer.pivot = this.mChaseActor.mSprite.position;
    //   this.mContainer.position.x = this.mWidth / 2;
    //   this.mContainer.position.y = this.mHeight / 2;
    // }
    // setChase(chaseActor: WorldActor) {
    //   this.mChaseActor = chaseActor;
    // }
    setZoom(zoom) {
        this.mContainer.scale.set((1 / zoom), (1 / zoom));
    }
    getZoom() {
        return (1 / this.mContainer.scale.x);
    }
    zoomInOut(zoom) {
        let z = this.mContainer.scale;
        this.mContainer.scale.set(z.x * (1 / zoom), z.y * (1 / zoom));
    }
}
//// <reference path="./WorldActor.ts" />
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
// <reference types="pixi.js"/>
/// <reference path="./BaseActor.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>
class SceneActor extends BaseActor {
    /// callback when this actor receives a pan event
    //mPanHandler: PanEventHandler;
    /// callback when this actor receives a pan stop event
    //TouchEventHandler mPanStopHandler;
    /// callback when this actor receives a zoom event
    //TouchEventHandler mZoomHandler;
    /// callback when this actor receives a Down event
    //TouchEventHandler mDownHandler;
    /**
    * Construct a SceneActor, but do not give it any physics yet
    *
    * @param scene   The scene into which this actor should be placed
    * @param imgName The image to show for this actor
    * @param width   The width of the actor's image and body, in meters
    * @param height  The height of the actor's image and body, in meters
    */
    constructor(scene, imgName, width, height) {
        super(scene, imgName, width, height);
    }
    /**
    * Disable touch for this actor
    */
    disableTouch() {
        this.mIsTouchable = false;
    }
    /**
    * Enable touch for this actor
    */
    enableTouch() {
        this.mIsTouchable = true;
    }
}
/// <reference path="./SceneActor.ts"/>
/**
* Level provides a broad, public, declarative interface to the core functionality of LibLOL.
* <p>
* Game designers will spend most of their time in the <code>display</code> function of the various
* <code>ScreenManager</code> objects that comprise the game (i.e., Chooser, Help, Levels, Splash,
* Store).  Within that function, a <code>Level</code> object is available.  It corresponds to a
* pre-configured, blank, interactive portion of the game.  By calling functions on the level, a
* programmer can realize their game.
* <p>
* Conceptually, a Level consists of many screens:
* <ul>
* <li>MainScreen: This is where the Actors of the game are drawn</li>
* <li>Hud: A heads-up display onto which text and input controls can be drawn</li>
* <li>PreScene: A quick scene to display before the level starts</li>
* <li>PostScene (WinScene or LoseScene): Two quick scenes to display at the end of the level</li>
* <li>PauseScene: A scene to show when the game is paused</li>
* </ul>
*/
class Level {
    /**
    * Construct a level.  Since Level is merely a facade, this method need only store references to
    * the actual game objects.
    *
    * @param config The configuration object describing this game
    * @param media  References to all image and sound assets
    * @param game   The top-level game object
    */
    constructor(config, media, game) {
        // save game configuration information
        this.mGame = game;
        this.mConfig = config;
        this.mMedia = media;
    }
    /**
    * Configure the camera bounds for a level
    * <p>
    * TODO: set upper and lower bounds, instead of assuming a lower bound of (0, 0)
    *
    * @param width  width of the camera
    * @param height height of the camera
    */
    setCameraBounds(width, height) {
        this.mGame.mManager.mWorld.mCamBound.Set(width, height);
        // warn on strange dimensions
        if (width < this.mConfig.mWidth / this.mConfig.mPixelMeterRatio)
            Lol.message(this.mConfig, "Warning", "Your game width is less than 1/10 of the screen width");
        if (height < this.mConfig.mHeight / this.mConfig.mPixelMeterRatio)
            Lol.message(this.mConfig, "Warning", "Your game height is less than 1/10 of the screen height");
    }
    /**
    * Identify the actor that the camera should try to keep on screen at all times
    *
    * @param actor The actor the camera should chase
    */
    setCameraChase(actor) {
        this.mGame.mManager.mWorld.mChaseActor = actor;
    }
    /**
    * Set the background music for this level
    *
    * @param musicName Name of the Music file to play
    */
    setMusic(musicName) {
        this.mGame.mManager.mWorld.mMusic = this.mMedia.getMusic(musicName);
    }
    // /**
    // * Specify that you want some code to run after a fixed amount of time passes.
    // *
    // * @param howLong  How long to wait before the timer code runs
    // * @param callback The code to run
    // */
    // public void setTimerCallback(float howLong, final LolAction callback) {
    //   Timer.schedule(new Timer.Task() {
    //     @Override
    //     public void run() {
    //       if (!mGame.mManager.mGameOver)
    //       callback.go();
    //     }
    //   }, howLong);
    // }
    //
    // /**
    // * Specify that you want some code to run repeatedly
    // *
    // * @param howLong  How long to wait before the timer code runs for the first time
    // * @param interval The time between subsequent executions of the code
    // * @param callback The code to run
    // */
    // public void setTimerCallback(float howLong, float interval, final LolAction callback) {
    //   Timer.schedule(new Timer.Task() {
    //     @Override
    //     public void run() {
    //       if (!mGame.mManager.mGameOver)
    //       callback.go();
    //     }
    //   }, howLong, interval);
    // }
    //
    // /**
    // * Turn on scribble mode, so that scene touch events draw circular objects
    // * <p>
    // * Note: this code should be thought of as serving to demonstrate, only. If you really wanted to
    // * do anything clever with scribbling, you'd certainly want to change this code.
    // *
    // * @param imgName          The name of the image to use for scribbling
    // * @param width            Width of the individual components of the scribble
    // * @param height           Height of the individual components of the scribble
    // * @param interval         Time (in milliseconds) that must transpire between scribble events...
    // *                         use this to avoid outrageously high rates of scribbling
    // * @param onCreateCallback A callback to run in order to modify the scribble behavior. The
    // *                         obstacle that is drawn in the scribble will be passed to the callback
    // */
    // public void setScribbleMode(final String imgName, final float width, final float height,
    //   final int interval, final LolActorEvent onCreateCallback) {
    //     // we set a callback on the Level, so that any touch to the level (down, drag, up) will
    //     // affect our scribbling
    //     mGame.mManager.mWorld.mPanHandlers.add(new PanEventHandler() {
    //       /// The time of the last touch event... we use this to prevent high rates of scribble
    //       long mLastTime;
    //
    //       /**
    //       * Draw a new obstacle if enough time has transpired
    //       */
    //       public boolean go(float worldX, float worldY, float deltaX, float deltaY) {
    //         // check if enough milliseconds have passed
    //         long now = System.currentTimeMillis();
    //         if (now < mLastTime + interval) {
    //           return true;
    //         }
    //         mLastTime = now;
    //
    //         // make a circular obstacle
    //         final Obstacle o = makeObstacleAsCircle(worldX - width / 2, worldY - height / 2,
    //           width, height, imgName);
    //           if (onCreateCallback != null) {
    //             onCreateCallback.go(o);
    //           }
    //
    //           return true;
    //         }
    //       });
    //     }
    /**
    * Manually set the zoom level of the game
    *
    * @param zoom The amount of zoom (1 is no zoom, >1 zooms out)
    */
    setZoom(zoom) {
        this.mGame.mManager.mWorld.mCamera.setZoom(zoom);
        //this.mGame.mManager.mBackground.mBgCam.zoom = zoom;
        //this.mGame.mManager.mForeground.mBgCam.zoom = zoom;
    }
    /**
    * Register a callback so that custom code will run when the level is won
    *
    * @param callback The code to run
    */
    setWinCallback(callback) {
        this.mGame.mManager.mWinCallback = callback;
    }
    /**
    * Register a callback so that custom code will run when the level is lost
    *
    * @param callback The code to run
    */
    setLoseCallback(callback) {
        this.mGame.mManager.mLoseCallback = callback;
    }
    /**
    * Manually increment the number of goodies of type 1 that have been collected.
    */
    incrementGoodiesCollected1() {
        this.mGame.mManager.mGoodiesCollected[0]++;
    }
    /**
    * Manually increment the number of goodies of type 2 that have been collected.
    */
    incrementGoodiesCollected2() {
        this.mGame.mManager.mGoodiesCollected[1]++;
    }
    /**
    * Manually increment the number of goodies of type 3 that have been collected.
    */
    incrementGoodiesCollected3() {
        this.mGame.mManager.mGoodiesCollected[2]++;
    }
    /**
    * Manually increment the number of goodies of type 4 that have been collected.
    */
    incrementGoodiesCollected4() {
        this.mGame.mManager.mGoodiesCollected[3]++;
    }
    /**
    * Getter for number of goodies of type 1 that have been collected.
    *
    * @return The number of goodies collected.
    */
    getGoodiesCollected1() {
        return this.mGame.mManager.mGoodiesCollected[0];
    }
    /**
    * Manually set the number of goodies of type 1 that have been collected.
    *
    * @param value The new value
    */
    setGoodiesCollected1(value) {
        this.mGame.mManager.mGoodiesCollected[0] = value;
    }
    /**
    * Getter for number of goodies of type 2 that have been collected.
    *
    * @return The number of goodies collected.
    */
    getGoodiesCollected2() {
        return this.mGame.mManager.mGoodiesCollected[1];
    }
    /**
    * Manually set the number of goodies of type 2 that have been collected.
    *
    * @param value The new value
    */
    setGoodiesCollected2(value) {
        this.mGame.mManager.mGoodiesCollected[1] = value;
    }
    /**
    * Getter for number of goodies of type 3 that have been collected.
    *
    * @return The number of goodies collected.
    */
    getGoodiesCollected3() {
        return this.mGame.mManager.mGoodiesCollected[2];
    }
    /**
    * Manually set the number of goodies of type 3 that have been collected.
    *
    * @param value The new value
    */
    setGoodiesCollected3(value) {
        this.mGame.mManager.mGoodiesCollected[2] = value;
    }
    /**
    * Getter for number of goodies of type 4 that have been collected.
    *
    * @return The number of goodies collected.
    */
    getGoodiesCollected4() {
        return this.mGame.mManager.mGoodiesCollected[3];
    }
    /**
    * Manually set the number of goodies of type 4 that have been collected.
    *
    * @param value The new value
    */
    setGoodiesCollected4(value) {
        this.mGame.mManager.mGoodiesCollected[3] = value;
    }
    /**
    * Indicate that the level is won by defeating a certain number of enemies or by defeating
    * all of the enemies if not given an argument. This version is useful if the number of
    * enemies isn't known, or if the goal is to defeat all enemies before more are are created.
    *
    * @param howMany The number of enemies that must be defeated to win the level
    */
    setVictoryEnemyCount(howMany) {
        this.mGame.mManager.mVictoryType = VictoryType.ENEMYCOUNT;
        if (howMany) {
            this.mGame.mManager.mVictoryEnemyCount = howMany;
        }
        else {
            this.mGame.mManager.mVictoryEnemyCount = -1;
        }
    }
    /**
    * Indicate that the level is won by collecting enough goodies
    *
    * @param v1 Number of type-1 goodies that must be collected to win the level
    * @param v2 Number of type-2 goodies that must be collected to win the level
    * @param v3 Number of type-3 goodies that must be collected to win the level
    * @param v4 Number of type-4 goodies that must be collected to win the level
    */
    setVictoryGoodies(v1, v2, v3, v4) {
        this.mGame.mManager.mVictoryType = VictoryType.GOODIECOUNT;
        this.mGame.mManager.mVictoryGoodieCount[0] = v1;
        this.mGame.mManager.mVictoryGoodieCount[1] = v2;
        this.mGame.mManager.mVictoryGoodieCount[2] = v3;
        this.mGame.mManager.mVictoryGoodieCount[3] = v4;
    }
    /**
    * Indicate that the level is won by having a certain number of heroes reach destinations
    *
    * @param howMany Number of heroes that must reach destinations
    */
    setVictoryDestination(howMany) {
        this.mGame.mManager.mVictoryType = VictoryType.DESTINATION;
        this.mGame.mManager.mVictoryHeroCount = howMany;
    }
    /**
    * Change the amount of time left in a countdown timer
    *
    * @param delta The amount of time to add before the timer expires
    */
    updateTimerExpiration(delta) {
        this.mGame.mManager.mLoseCountDownRemaining += delta;
    }
    /**
    * Report the number of enemies that have been defeated
    *
    * @return the number of defeated enemies
    */
    getEnemiesDefeated() {
        return this.mGame.mManager.mEnemiesDefeated;
    }
    /**
    * Force the level to end in victory
    * <p>
    * This is useful in callbacks, where we might want to immediately end the game
    */
    winLevel() {
        this.mGame.mManager.endLevel(true);
    }
    /**
    * Force the level to end in defeat
    * <p>
    * This is useful in callbacks, where we might want to immediately end the game
    */
    loseLevel() {
        this.mGame.mManager.endLevel(false);
    }
    /**
    * Change the gravity in a running level
    *
    * @param newXGravity The new X gravity
    * @param newYGravity The new Y gravity
    */
    resetGravity(newXGravity, newYGravity) {
        this.mGame.mManager.mWorld.mWorld.SetGravity(new PhysicsType2d.Vector2(newXGravity, newYGravity));
    }
    /**
    * Generate text that doesn't change
    *
    * @param text The text to generate each time the TextProducer is called
    * @return A TextProducer who generates the text
    */
    DisplayFixedText(text) {
        return new (class _ {
            //@Override
            makeText() {
                return text;
            }
        })();
    }
    /**
    * Generate text indicating the current count of Type 1 Goodies
    */
    DisplayGoodies1() {
        let out_this = this;
        return new (class _ {
            //@Override
            makeText() {
                return "" + out_this.mGame.mManager.mGoodiesCollected[0];
            }
        })();
    }
    /**
    * Generate text indicating the current count of Type 2 Goodies
    */
    DisplayGoodies2() {
        let out_this = this;
        return new (class _ {
            //@Override
            makeText() {
                return "" + out_this.mGame.mManager.mGoodiesCollected[1];
            }
        })();
    }
    /**
    * Generate text indicating the current count of Type 3 Goodies
    */
    DisplayGoodies3() {
        let out_this = this;
        return new (class _ {
            //@Override
            makeText() {
                return "" + out_this.mGame.mManager.mGoodiesCollected[2];
            }
        })();
    }
    /**
    * Generate text indicating the current count of Type 4 Goodies
    */
    DisplayGoodies4() {
        let out_this = this;
        return new (class _ {
            //@Override
            makeText() {
                return "" + out_this.mGame.mManager.mGoodiesCollected[3];
            }
        })();
    }
    /**
    * Generate text indicating the time until the level is lost
    */
    DisplayLoseCountdown() {
        let out_this = this;
        return new (class _ {
            //@Override
            makeText() {
                return "" + (out_this.mGame.mManager.mLoseCountDownRemaining).toFixed(0);
            }
        })();
    }
    /**
    * Generate text indicating the time until the level is won
    */
    DisplayWinCountdown() {
        let out_this = this;
        return new (class _ {
            //@Override
            makeText() {
                return "" + (out_this.mGame.mManager.mWinCountRemaining).toFixed(0);
            }
        })();
    }
    /**
    * Generate text indicating the number of defeated enemies
    */
    DisplayEnemiesDefeated() {
        let out_this = this;
        return new (class _ {
            //@Override
            makeText() {
                let ed = out_this.mGame.mManager.getEnemiesDefeated();
                return "" + ed;
            }
        })();
    }
    /**
    * Generate text indicating the number of remaining projectiles
    */
    DisplayRemainingProjectiles() {
        let out_this = this;
        return new (class _ {
            //@Override
            makeText() {
                return "" + out_this.mGame.mManager.mWorld.mProjectilePool.mProjectilesRemaining;
            }
        })();
    }
    /**
    * Generate text indicating the strength of a hero
    *
    * @param h The hero whose strength is to be displayed
    * @return A TextProducer who produces the hero's strength
    */
    DisplayStrength(h) {
        let out_this = this;
        return new (class _ {
            //@Override
            makeText() {
                return "" + h.getStrength();
            }
        })();
    }
    /**
    * Place some text on the screen.  The text will be generated by tp, which is called on every
    * screen render
    *
    * @param x         The X coordinate of the bottom left corner (in pixels)
    * @param y         The Y coordinate of the bottom left corner (in pixels)
    * @param fontName  The name of the font to use
    * @param fontColor The color to use for the text
    * @param size      The font size
    * @param prefix    Text to display before the produced text
    * @param suffix    Text to display after the produced text
    * @param tp        The TextProducer
    * @param zIndex    The z index where the text should go
    * @return The display, so that it can be controlled further if needed
    */
    addDisplay(x, y, fontName, fontColor, size, prefix, suffix, tp, zIndex) {
        return this.mGame.mManager.mHud.addText(x, y, fontName, fontColor, size, prefix, suffix, tp, zIndex);
    }
    /**
    * Indicate that the level will end in defeat if it is not completed in a given amount of time.
    *
    * @param timeout The amount of time until the level will end in defeat
    */
    setLoseCountdown(timeout) {
        // Once the Lose CountDown is not -100, it will start counting down
        this.mGame.mManager.mLoseCountDownRemaining = timeout;
    }
    /**
    * Indicate that the level will end in victory if the hero survives for a given amount of time
    *
    * @param timeout The amount of time until the level will end in victory
    * @param text    The text to display when the level ends in victory
    */
    setWinCountdown(timeout, text) {
        // Once the Win CountDown is not -100, it will start counting down
        this.mGame.mManager.mWinCountRemaining = timeout;
        this.mGame.mManager.mWinCountText = text;
    }
    /**
    * Add a button that performs an action when clicked.
    *
    * @param x       The X coordinate of the bottom left corner (in pixels)
    * @param y       The Y coordinate of the bottom left corner (in pixels)
    * @param width   The width of the image
    * @param height  The height of the image
    * @param imgName The name of the image to display. Use "" for an invisible button
    * @param action  The action to run in response to a tap
    */
    addTapControl(x, y, width, height, imgName, action) {
        let c = new SceneActor(this.mGame.mManager.mHud, imgName, width, height);
        c.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y);
        //c.mTapHandler = action;
        //action.mSource = c;
        c.mSprite.interactive = true;
        c.mSprite.on('click', () => action.go());
        c.mSprite.on('tap', () => action.go());
        this.mGame.mManager.mHud.addActor(c, 0);
        return c;
    }
    /**
    * Create an action that makes a hero jump.
    *
    * @param hero The hero who we want to jump
    * @param milliDelay If there should be time between being allowed to jump
    * @return The action object
    */
    JumpAction(hero, milliDelay) {
        return new (class _ extends LolAction {
            constructor() {
                super(...arguments);
                this.mLastJump = 0;
            }
            go() {
                let now = new Date().getTime();
                if (this.mLastJump + milliDelay < now) {
                    this.mLastJump = now;
                    hero.jump();
                }
            }
        })();
    }
    /**
    * Create an action that makes a hero throw a projectile
    *
    * @param hero      The hero who should throw the projectile
    * @param offsetX   specifies the x distance between the bottom left of the projectile and the
    *                  bottom left of the hero throwing the projectile
    * @param offsetY   specifies the y distance between the bottom left of the projectile and the
    *                  bottom left of the hero throwing the projectile
    * @param velocityX The X velocity of the projectile when it is thrown
    * @param velocityY The Y velocity of the projectile when it is thrown
    * @return The action object
    */
    ThrowFixedAction(hero, offsetX, offsetY, velocityX, velocityY) {
        let out_this = this;
        return new (class _ extends LolAction {
            go() {
                out_this.mGame.mManager.mWorld.mProjectilePool.throwFixed(hero, offsetX, offsetY, velocityX, velocityY);
                return true;
            }
        })();
    }
    /**
    * Create an action that makes a hero throw a projectile in a direction that relates to how the
    * screen was touched
    *
    * @param hero    The hero who should throw the projectile
    * @param offsetX specifies the x distance between the top left of the projectile and the
    *                bottom left of the hero throwing the projectile
    * @param offsetY specifies the y distance between the top left of the projectile and the
    *                bottom left of the hero throwing the projectile
    * @return The action object
    */
    ThrowDirectionalAction(hero, offsetX, offsetY) {
        let out_this = this;
        return new (class _ extends TouchEventHandler {
            go(worldX, worldY) {
                out_this.mGame.mManager.mWorld.mProjectilePool.throwAt(hero.getXPosition(), hero.getYPosition(), worldX, worldY, hero, offsetX, offsetY);
                return true;
            }
        })();
    }
    /**
    * Create an action that makes the screen zoom out
    *
    * @param maxZoom The maximum zoom factor to allow
    * @return The action object
    */
    ZoomOutAction(maxZoom) {
        let out_this = this;
        return new (class _ extends LolAction {
            go() {
                let curzoom = out_this.mGame.mManager.mWorld.mCamera.getZoom();
                if (curzoom < maxZoom) {
                    out_this.mGame.mManager.mWorld.mCamera.zoomInOut(2);
                    //out_this.mGame.mManager.mBackground.mBgCam.zoom *= 2;
                    //out_this.mGame.mManager.mForeground.mBgCam.zoom *= 2;
                }
            }
        })();
    }
    /**
    * Create an action that makes the screen zoom in
    *
    * @param minZoom The minimum zoom factor to allow
    * @return The action object
    */
    ZoomInAction(minZoom) {
        let out_this = this;
        return new (class _ extends LolAction {
            go() {
                let curzoom = out_this.mGame.mManager.mWorld.mCamera.getZoom();
                if (curzoom > minZoom) {
                    out_this.mGame.mManager.mWorld.mCamera.zoomInOut(0.5);
                    //out_this.mGame.mManager.mBackground.mBgCam.zoom /= 2;
                    //out_this.mGame.mManager.mForeground.mBgCam.zoom /= 2;
                }
            }
        })();
    }
    /**
    * Create an action for moving an actor in the X direction.  This action can be used by a
    * Control.
    *
    * @param actor The actor to move
    * @param xRate The rate at which the actor should move in the X direction (negative values are
    *              allowed)
    * @return The action
    */
    makeXMotionAction(actor, xRate) {
        return new (class _ extends LolAction {
            //@Override
            go() {
                let v = actor.mBody.GetLinearVelocity();
                v.x = xRate;
                actor.updateVelocity(v.x, v.y);
            }
        })();
    }
    /**
    * Create an action for moving an actor in the Y direction.  This action can be used by a
    * Control.
    *
    * @param actor The actor to move
    * @param yRate The rate at which the actor should move in the Y direction (negative values are
    *              allowed)
    * @return The action
    */
    makeYMotionAction(actor, yRate) {
        return new (class _ extends LolAction {
            //@Override
            go() {
                let v = actor.mBody.GetLinearVelocity();
                v.y = yRate;
                actor.updateVelocity(v.x, v.y);
            }
        })();
    }
    /**
    * Create an action for moving an actor in the X and Y directions.  This action can be used by a
    * Control.
    *
    * @param actor The actor to move
    * @param xRate The rate at which the actor should move in the X direction (negative values are
    *              allowed)
    * @param yRate The rate at which the actor should move in the Y direction (negative values are
    *              allowed)
    * @return The action
    */
    makeXYMotionAction(actor, xRate, yRate) {
        return new (class _ extends LolAction {
            go() {
                actor.updateVelocity(xRate, yRate);
            }
        })();
    }
    /**
    * Let an actor be controlled by arrow keys
    *
    * @param actor     The actor to move
    * @param speed     Speed to move an actor
    * @param dampening The dampening factor
    */
    setArrowKeyControls(actor, speed) {
        let up = this.makeYMotionAction(actor, -speed);
        let down = this.makeYMotionAction(actor, speed);
        let left = this.makeXMotionAction(actor, -speed);
        let right = this.makeXMotionAction(actor, speed);
        document.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp") {
                up.go();
            }
            else if (e.key == "ArrowDown") {
                down.go();
            }
            else if (e.key == "ArrowLeft") {
                left.go();
            }
            else if (e.key == "ArrowRight") {
                right.go();
            }
        });
        document.addEventListener("keyup", (e) => {
            if (e.key == "ArrowUp") {
                actor.updateVelocity(actor.mBody.GetLinearVelocity().x, 0);
            }
            else if (e.key == "ArrowDown") {
                actor.updateVelocity(actor.mBody.GetLinearVelocity().x, 0);
            }
            else if (e.key == "ArrowLeft") {
                actor.updateVelocity(0, actor.mBody.GetLinearVelocity().y);
            }
            else if (e.key == "ArrowRight") {
                actor.updateVelocity(0, actor.mBody.GetLinearVelocity().y);
            }
        });
    }
    /**
    * Set a key to perform an action when it is pressed
    *
    * @param key        The key that performs the action
    * @param action     An action to perform
    * @param repeat     Whether holding the button repeats the action
    */
    setKeyAction(keyCode, action, repeat) {
        action.mIsActive = false;
        this.mGame.mManager.mWorld.mRepeatEvents.push(action);
        let func = (e) => {
            if (e.keyCode == keyCode) {
                action.mIsActive = true;
            }
        };
        this.mGame.mManager.mFunctions.push(func);
        this.mGame.mManager.mEventTypes.push("keydown");
        document.addEventListener("keydown", func);
        let func2 = (e) => {
            if (e.keyCode == keyCode) {
                action.mIsActive = false;
            }
        };
        this.mGame.mManager.mFunctions.push(func2);
        this.mGame.mManager.mEventTypes.push("keyup");
        document.addEventListener("keyup", func2);
    }
    /**
    * Do an action when the mouse is clicked
    *
    * @param action The action to take when the mouse is clicked
    */
    setClickAction(action) {
        let func = (e) => {
            action.go(e.pageX, e.pageY);
        };
        this.mGame.mManager.mFunctions.push(func);
        this.mGame.mManager.mEventTypes.push("mousedown");
        document.addEventListener("mousedown", func);
        this.mGame.mManager.mFunctions.push(func);
        this.mGame.mManager.mEventTypes.push("touchstart");
        document.addEventListener("touchstart", func);
    }
    /**
    * Create an action for moving an actor in the X and Y directions, with dampening on release.
    * This action can be used by a Control.
    *
    * @param actor     The actor to move
    * @param xRate     The rate at which the actor should move in the X direction (negative values
    *                  are allowed)
    * @param yRate     The rate at which the actor should move in the Y direction (negative values
    *                  are allowed)
    * @param dampening The dampening factor
    * @return The action
    */
    makeXYDampenedMotionAction(actor, xRate, yRate, dampening) {
        let action = new (class _ extends LolAction {
            //@Override
            go() {
                actor.updateVelocity(xRate, yRate);
                actor.mBody.SetLinearDamping(dampening);
            }
        })();
        return action;
    }
    /**
    * Create an action for making a hero either start or stop crawling
    *
    * @param hero       The hero to control
    * @param crawlState True to start crawling, false to stop
    * @return The action
    */
    makeCrawlToggle(hero, crawlState) {
        return new (class _ extends LolAction {
            //@Override
            go() {
                if (crawlState)
                    hero.crawlOn();
                else
                    hero.crawlOff();
            }
        })();
    }
    /**
    * Create an action for making a hero rotate
    *
    * @param hero The hero to rotate
    * @param rate Amount of rotation to apply to the hero on each press
    * @return The action
    */
    makeRotator(hero, rate) {
        return new (class _ extends LolAction {
            //@Override
            go() {
                hero.increaseRotation(rate);
            }
        })();
    }
    /**
    * Create an action for making a hero throw a projectile
    *
    * @param hero       The hero who should throw the projectile
    * @param milliDelay A delay between throws, so that holding doesn't lead to too many throws at
    *                   once
    * @param offsetX    specifies the x distance between the bottom left of the projectile and the
    *                   top left of the hero throwing the projectile
    * @param offsetY    specifies the y distance between the bottom left of the projectile and the
    *                   top left of the hero throwing the projectile
    * @param velocityX  The X velocity of the projectile when it is thrown
    * @param velocityY  The Y velocity of the projectile when it is thrown
    * @return The action object
    */
    makeRepeatThrow(hero, milliDelay, offsetX, offsetY, velocityX, velocityY) {
        let out_this = this;
        return new (class _ extends LolAction {
            constructor() {
                super(...arguments);
                this.mLastThrow = 0;
            }
            go() {
                let now = new Date().getTime();
                if (this.mLastThrow + milliDelay < now) {
                    this.mLastThrow = now;
                    out_this.mGame.mManager.mWorld.mProjectilePool.throwFixed(hero, offsetX, offsetY, velocityX, velocityY);
                }
            }
        })();
    }
    /**
    * Add an image to the heads-up display. Touching the image has no effect
    *
    * @param x       The X coordinate of the top left corner (in pixels)
    * @param y       The Y coordinate of the top left corner (in pixels)
    * @param width   The width of the image
    * @param height  The height of the image
    * @param imgName The name of the image to display. Use "" for an invisible button
    * @return The image that was created
    */
    addImage(x, y, width, height, imgName) {
        let c = new SceneActor(this.mGame.mManager.mHud, imgName, width, height);
        c.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y);
        this.mGame.mManager.mHud.addActor(c, 0);
        return c;
    }
    /**
    * Make an enemy that has an underlying rectangular shape.
    *
    * @param x       The X coordinate of the top left corner
    * @param y       The Y coordinate of the top right corner
    * @param width   The width of the enemy
    * @param height  The height of the enemy
    * @param imgName The name of the image to display
    * @return The enemy, so that it can be modified further
    */
    makeEnemyAsBox(x, y, width, height, imgName) {
        let e = new Enemy(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        this.mGame.mManager.mEnemiesCreated++;
        e.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y);
        this.mGame.mManager.mWorld.addActor(e, 0);
        return e;
    }
    /**
    * Draw an enemy with an underlying polygon shape
    *
    * @param x       X coordinate of the top left corner
    * @param y       Y coordinate of the top left corner
    * @param width   Width of the obstacle
    * @param height  Height of the obstacle
    * @param imgName Name of image file to use
    * @param verts   Up to 16 coordinates representing the vertexes of this polygon, listed as
    *                x0,y0,x1,y1,x2,y2,...
    * @return The enemy, so that it can be further modified
    */
    makeEnemyAsPolygon(x, y, width, height, imgName, verts) {
        let e = new Enemy(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        this.mGame.mManager.mEnemiesCreated++;
        e.setPolygonPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, verts);
        this.mGame.mManager.mWorld.addActor(e, 0);
        return e;
    }
    /**
    * Make an enemy that has an underlying circular shape.
    *
    * @param x       The X coordinate of the top left corner
    * @param y       The Y coordinate of the top right corner
    * @param width   The width of the enemy
    * @param height  The height of the enemy
    * @param imgName The name of the image to display
    * @return The enemy, so that it can be modified further
    */
    makeEnemyAsCircle(x, y, width, height, imgName) {
        let radius = Math.max(width, height);
        let e = new Enemy(this.mGame, this.mGame.mManager.mWorld, radius, radius, imgName);
        this.mGame.mManager.mEnemiesCreated++;
        e.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, radius / 2);
        this.mGame.mManager.mWorld.addActor(e, 0);
        return e;
    }
    /**
    * Make a destination that has an underlying rectangular shape.
    *
    * @param x       The X coordinate of the top left corner
    * @param y       The Y coordinate of the top right corner
    * @param width   The width of the destination
    * @param height  The height of the destination
    * @param imgName The name of the image to display
    * @return The destination, so that it can be modified further
    */
    makeDestinationAsBox(x, y, width, height, imgName) {
        let d = new Destination(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        d.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y);
        d.setCollisionsEnabled(false);
        this.mGame.mManager.mWorld.addActor(d, 0);
        return d;
    }
    /**
    * Draw a destination with an underlying polygon shape
    *
    * @param x       X coordinate of the bottom left corner
    * @param y       Y coordinate of the bottom left corner
    * @param width   Width of the obstacle
    * @param height  Height of the obstacle
    * @param imgName Name of image file to use
    * @param verts   Up to 16 coordinates representing the vertexes of this polygon, listed as
    *                x0,y0,x1,y1,x2,y2,...
    * @return The destination, so that it can be further modified
    */
    makeDestinationAsPolygon(x, y, width, height, imgName, verts) {
        let d = new Destination(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        d.setPolygonPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, verts);
        d.setCollisionsEnabled(false);
        this.mGame.mManager.mWorld.addActor(d, 0);
        return d;
    }
    /**
    * Make a destination that has an underlying circular shape.
    *
    * @param x       The X coordinate of the bottom left corner
    * @param y       The Y coordinate of the bottom right corner
    * @param width   The width of the destination
    * @param height  The height of the destination
    * @param imgName The name of the image to display
    * @return The destination, so that it can be modified further
    */
    makeDestinationAsCircle(x, y, width, height, imgName) {
        let radius = Math.max(width, height);
        let d = new Destination(this.mGame, this.mGame.mManager.mWorld, radius, radius, imgName);
        d.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, radius / 2);
        d.setCollisionsEnabled(false);
        this.mGame.mManager.mWorld.addActor(d, 0);
        return d;
    }
    /**
    * Draw an obstacle with an underlying box shape
    *
    * @param x       X coordinate of the bottom left corner
    * @param y       Y coordinate of the bottom left corner
    * @param width   Width of the obstacle
    * @param height  Height of the obstacle
    * @param imgName Name of image file to use
    * @return The obstacle, so that it can be further modified
    */
    makeObstacleAsBox(x, y, width, height, imgName) {
        let o = new Obstacle(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        o.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y);
        this.mGame.mManager.mWorld.addActor(o, 0);
        return o;
    }
    /**
    * Draw an obstacle with an underlying polygon shape
    *
    * @param x       X coordinate of the bottom left corner
    * @param y       Y coordinate of the bottom left corner
    * @param width   Width of the obstacle
    * @param height  Height of the obstacle
    * @param imgName Name of image file to use
    * @param verts   Up to 16 coordinates representing the vertexes of this polygon, listed as
    *                x0,y0,x1,y1,x2,y2,...
    * @return The obstacle, so that it can be further modified
    */
    makeObstacleAsPolygon(x, y, width, height, imgName, verts) {
        let o = new Obstacle(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        o.setPolygonPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, verts);
        this.mGame.mManager.mWorld.addActor(o, 0);
        return o;
    }
    /**
    * Draw an obstacle with an underlying circle shape
    *
    * @param x       X coordinate of the bottom left corner
    * @param y       Y coordinate of the bottom left corner
    * @param width   Width of the obstacle
    * @param height  Height of the obstacle
    * @param imgName Name of image file to use
    * @return The obstacle, so that it can be further modified
    */
    makeObstacleAsCircle(x, y, width, height, imgName) {
        let radius = Math.max(width, height);
        let o = new Obstacle(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        o.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, radius / 2);
        this.mGame.mManager.mWorld.addActor(o, 0);
        return o;
    }
    /**
    * Draw a goodie with an underlying box shape, and a default score of [1,0,0,0]
    *
    * @param x       X coordinate of bottom left corner
    * @param y       Y coordinate of bottom left corner
    * @param width   Width of the image
    * @param height  Height of the image
    * @param imgName Name of image file to use
    * @return The goodie, so that it can be further modified
    */
    makeGoodieAsBox(x, y, width, height, imgName) {
        let g = new Goodie(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        g.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y);
        g.setCollisionsEnabled(false);
        this.mGame.mManager.mWorld.addActor(g, 0);
        return g;
    }
    /**
    * Draw a goodie with an underlying circle shape, and a default score of [1,0,0,0]
    *
    * @param x       X coordinate of bottom left corner
    * @param y       Y coordinate of bottom left corner
    * @param width   Width of the image
    * @param height  Height of the image
    * @param imgName Name of image file to use
    * @return The goodie, so that it can be further modified
    */
    makeGoodieAsCircle(x, y, width, height, imgName) {
        let radius = Math.max(width, height);
        let g = new Goodie(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        g.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, radius / 2);
        g.setCollisionsEnabled(false);
        this.mGame.mManager.mWorld.addActor(g, 0);
        return g;
    }
    /**
    * Draw a goodie with an underlying polygon shape
    *
    * @param x       X coordinate of the bottom left corner
    * @param y       Y coordinate of the bottom left corner
    * @param width   Width of the obstacle
    * @param height  Height of the obstacle
    * @param imgName Name of image file to use
    * @param verts   Up to 16 coordinates representing the vertexes of this polygon, listed as
    *                x0,y0,x1,y1,x2,y2,...
    * @return The goodie, so that it can be further modified
    */
    makeGoodieAsPolygon(x, y, width, height, imgName, verts) {
        let g = new Goodie(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        g.setPolygonPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, verts);
        g.setCollisionsEnabled(false);
        this.mGame.mManager.mWorld.addActor(g, 0);
        return g;
    }
    /**
    * Make a Hero with an underlying rectangular shape
    *
    * @param x       X coordinate of the hero
    * @param y       Y coordinate of the hero
    * @param width   width of the hero
    * @param height  height of the hero
    * @param imgName File name of the default image to display
    * @return The hero that was created
    */
    makeHeroAsBox(x, y, width, height, imgName) {
        let h = new Hero(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        this.mGame.mManager.mHeroesCreated++;
        h.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, x, y);
        this.mGame.mManager.mWorld.addActor(h, 0);
        return h;
    }
    /**
    * Make a Hero with an underlying circular shape
    *
    * @param x       X coordinate of the hero
    * @param y       Y coordinate of the hero
    * @param width   width of the hero
    * @param height  height of the hero
    * @param imgName File name of the default image to display
    * @return The hero that was created
    */
    makeHeroAsCircle(x, y, width, height, imgName) {
        let radius = Math.max(width, height);
        let h = new Hero(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        this.mGame.mManager.mHeroesCreated++;
        h.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, x, y, radius / 2);
        this.mGame.mManager.mWorld.addActor(h, 0);
        return h;
    }
    /**
    * Draw a hero with an underlying polygon shape
    *
    * @param x       X coordinate of the bottom left corner
    * @param y       Y coordinate of the bottom left corner
    * @param width   Width of the obstacle
    * @param height  Height of the obstacle
    * @param imgName Name of image file to use
    * @param verts   Up to 16 coordinates representing the vertexes of this polygon, listed as
    *                x0,y0,x1,y1,x2,y2,...
    * @return The hero, so that it can be further modified
    */
    makeHeroAsPolygon(x, y, width, height, imgName, verts) {
        let h = new Hero(this.mGame, this.mGame.mManager.mWorld, width, height, imgName);
        this.mGame.mManager.mHeroesCreated++;
        h.setPolygonPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, verts);
        this.mGame.mManager.mWorld.addActor(h, 0);
        return h;
    }
    /**
    * Specify a limit on how far away from the Hero a projectile can go.  Without this, projectiles
    * could keep on traveling forever.
    *
    * @param distance Maximum distance from the hero that a projectile can travel
    */
    setProjectileRange(distance) {
        for (let p of this.mGame.mManager.mWorld.mProjectilePool.mPool)
            p.mRange = distance;
    }
    /**
    * Indicate that projectiles should feel the effects of gravity. Otherwise, they will be (more
    * or less) immune to gravitational forces.
    */
    setProjectileGravityOn() {
        for (let p of this.mGame.mManager.mWorld.mProjectilePool.mPool)
            p.mBody.SetGravityScale(1);
    }
    /**
    * The "directional projectile" mechanism might lead to the projectiles moving too fast. This
    * will cause the speed to be multiplied by a factor
    *
    * @param factor The value to multiply against the projectile speed.
    */
    setProjectileVectorDampeningFactor(factor) {
        this.mGame.mManager.mWorld.mProjectilePool.mDirectionalDamp = factor;
    }
    /**
    * Indicate that all projectiles should participate in collisions, rather than disappearing when
    * they collide with other actors
    */
    enableCollisionsForProjectiles() {
        this.mGame.mManager.mWorld.mProjectilePool.mSensorProjectiles = false;
    }
    /**
    * Indicate that projectiles thrown with the "directional" mechanism should have a fixed
    * velocity
    *
    * @param velocity The magnitude of the velocity for projectiles
    */
    setFixedVectorThrowVelocityForProjectiles(velocity) {
        this.mGame.mManager.mWorld.mProjectilePool.mEnableFixedVectorVelocity = true;
        this.mGame.mManager.mWorld.mProjectilePool.mFixedVectorVelocity = velocity;
    }
    /**
    * Indicate that projectiles thrown via the "directional" mechanism should be rotated to face in
    * their direction or movement
    */
    setRotateVectorThrowForProjectiles() {
        this.mGame.mManager.mWorld.mProjectilePool.mRotateVectorThrow = true;
    }
    /**
    * Indicate that when two projectiles collide, they should both remain on screen
    */
    setCollisionOkForProjectiles() {
        for (let p of this.mGame.mManager.mWorld.mProjectilePool.mPool)
            p.mDisappearOnCollide = false;
    }
    /**
    * Describe the behavior of projectiles in a scene. You must call this if you intend to use
    * projectiles in your scene.
    *
    * @param size     number of projectiles that can be thrown at once
    * @param width    width of a projectile
    * @param height   height of a projectile
    * @param imgName  image to use for projectiles
    * @param strength specifies the amount of damage that a projectile does to an enemy
    * @param zIndex   The z plane on which the projectiles should be drawn
    * @param isCircle Should projectiles have an underlying circle or box shape?
    */
    configureProjectiles(size, width, height, imgName, strength, zIndex, isCircle) {
        this.mGame.mManager.mWorld.mProjectilePool = new ProjectilePool(this.mGame, this.mGame.mManager.mWorld, size, width, height, imgName, strength, zIndex, isCircle);
    }
    /**
    * Set a limit on the total number of projectiles that can be thrown
    *
    * @param number How many projectiles are available
    */
    setNumberOfProjectiles(number) {
        this.mGame.mManager.mWorld.mProjectilePool.mProjectilesRemaining = number;
    }
    /**
    * Specify a sound to play when the projectile is thrown
    *
    * @param soundName Name of the sound file to play
    */
    setThrowSound(soundName) {
        this.mGame.mManager.mWorld.mProjectilePool.mThrowSound = this.mMedia.getSound(soundName);
    }
    /**
    * Specify the sound to play when a projectile disappears
    *
    * @param soundName the name of the sound file to play
    */
    setProjectileDisappearSound(soundName) {
        this.mGame.mManager.mWorld.mProjectilePool.mProjectileDisappearSound =
            this.mMedia.getSound(soundName);
    }
    /**
    * Draw a box on the scene
    * <p>
    * Note: the box is actually four narrow rectangles
    *
    * @param x0         X coordinate of left side
    * @param y0         Y coordinate of top
    * @param x1         X coordinate of right side
    * @param y1         Y coordinate of bottom
    * @param imgName    name of the image file to use when drawing the rectangles
    * @param density    Density of the rectangle. When in doubt, use 1
    * @param elasticity Elasticity of the rectangle. When in doubt, use 0
    * @param friction   Friction of the rectangle. When in doubt, use 1
    */
    drawBoundingBox(x0, y0, x1, y1, imgName, density, elasticity, friction) {
        let bottom = this.makeObstacleAsBox(x0 - 1, y1, Math.abs(x0 - x1) + 2, 1, imgName);
        bottom.setPhysics(density, elasticity, friction);
        let top = this.makeObstacleAsBox(x0 - 1, y0 - 1, Math.abs(x0 - x1) + 2, 1, imgName);
        top.setPhysics(density, elasticity, friction);
        let left = this.makeObstacleAsBox(x0 - 1, y0 - 1, 1, Math.abs(y0 - y1) + 2, imgName);
        left.setPhysics(density, elasticity, friction);
        let right = this.makeObstacleAsBox(x1, y0 - 1, 1, Math.abs(y0 - y1) + 2, imgName);
        right.setPhysics(density, elasticity, friction);
    }
    /**
    * Draw a picture on the current level
    * <p>
    * Note: the order in which this is called relative to other actors will determine whether they
    * go under or over this picture.
    *
    * @param x       X coordinate of bottom left corner
    * @param y       Y coordinate of bottom left corner
    * @param width   Width of the picture
    * @param height  Height of this picture
    * @param imgName Name of the picture to display
    * @param zIndex  The z index of the image. There are 5 planes: -2, -2, 0, 1, and 2. By default,
    *                everything goes to plane 0
    */
    drawPicture(x, y, width, height, imgName, zIndex) {
        this.mGame.mManager.mWorld.makePicture(x, y, width, height, imgName, zIndex);
    }
    /**
    * Draw some text in the scene, using a bottom-left coordinate
    *
    * @param x         The x coordinate of the bottom left corner
    * @param y         The y coordinate of the bottom left corner
    * @param fontName  The name of the font to use
    * @param fontColor The color of the font
    * @param fontSize  The size of the font
    * @param prefix    Prefix text to put before the generated text
    * @param suffix    Suffix text to put after the generated text
    * @param tp        A TextProducer that will generate the text to display
    * @param zIndex    The z index of the text
    * @return A Renderable of the text, so it can be enabled/disabled by program code
    */
    addText(x, y, fontName, fontColor, fontSize, prefix, suffix, tp, zIndex) {
        return this.mGame.mManager.mWorld.addText(x, y, fontName, fontColor, fontSize, prefix, suffix, tp, zIndex);
    }
    /**
    * Draw some text in the scene, using a top-left coordinate
    *
    * @param x         The x coordinate of the bottom left corner
    * @param y         The y coordinate of the bottom left corner
    * @param fontName  The name of the font to use
    * @param fontColor The color of the font
    * @param fontSize  The size of the font
    * @param text      Text text to put before the generated text
    * @param zIndex    The z index of the text
    * @return A Renderable of the text, so it can be enabled/disabled by program code
    */
    addStaticText(x, y, fontName, fontColor, fontSize, text, zIndex) {
        return this.mGame.mManager.mWorld.addStaticText(x, y, fontName, fontColor, fontSize, text, zIndex);
    }
    /**
    * Draw some text in the scene, centering it
    *
    * @param x         The x coordinate of the middle
    * @param y         The y coordinate of the middle
    * @param fontName  The name of the font to use
    * @param fontColor The color of the font
    * @param fontSize  The size of the font
    * @param text      Text text to put before the generated text
    * @param zIndex    The z index of the text
    * @return A Renderable of the text, so it can be enabled/disabled by program code
    */
    addStaticTextCentered(x, y, fontName, fontColor, fontSize, text, zIndex) {
        return this.mGame.mManager.mWorld.addStaticTextCentered(x, y, fontName, fontColor, fontSize, text, zIndex);
    }
    /**
    * Draw some text in the scene, centering it on a specific point
    *
    * @param centerX   The x coordinate of the center
    * @param centerY   The y coordinate of the center
    * @param fontName  The name of the font to use
    * @param fontColor The color of the font
    * @param fontSize  The size of the font
    * @param prefix    Prefix text to put before the generated text
    * @param suffix    Suffix text to put after the generated text
    * @param tp        A TextProducer that will generate the text to display
    * @param zIndex    The z index of the text
    * @return A Renderable of the text, so it can be enabled/disabled by program code
    */
    addTextCentered(centerX, centerY, fontName, fontColor, fontSize, prefix, suffix, tp, zIndex) {
        return this.mGame.mManager.mWorld.addTextCentered(centerX, centerY, fontName, fontColor, fontSize, prefix, suffix, tp, zIndex);
    }
    /**
    * Generate a random number x in the range [0,max)
    *
    * @param max The largest number returned will be one less than max
    * @return a random integer
    */
    getRandom(max) {
        return Math.floor(Math.random() * max);
    }
    /**
    * load the splash screen
    */
    doSplash() {
        this.mGame.mManager.doSplash();
    }
    /**
    * load the level-chooser screen. Note that when the chooser is disabled, we jump straight to
    * level 1.
    *
    * @param whichChooser The chooser screen to create
    */
    doChooser(whichChooser) {
        this.mGame.mManager.doChooser(whichChooser);
    }
    /**
    * load a playable level.
    *
    * @param which The index of the level to load
    */
    doLevel(which) {
        this.mGame.mManager.doPlay(which);
    }
    /**
    * load a help level.
    *
    * @param which The index of the help level to load
    */
    doHelp(which) {
        this.mGame.mManager.doHelp(which);
    }
}
/// <reference path="./Level.ts"/>
/// <reference path="./ScreenManager.ts"/>
/**
* Config stores game-specific configuration values.
* <p>
* A programmer should extend Config, and change these values in their class constructor.
*/
class Config {
    constructor() { }
}
/// <reference path="./BaseActor.ts"/>
class WorldActor extends BaseActor {
    /**
    * Create a new actor that does not yet have physics, but that has a renderable picture
    *
    * @param game    The currently active game
    * @param scene   The scene into which the actor is being placed
    * @param imgName The image to display
    * @param width   The width
    * @param height  The height
    */
    constructor(game, scene, imgName, width, height) {
        super(scene, imgName, width, height);
        /// When the camera follows the actor without centering on it, this gives us the difference
        /// between the actor and camera
        this.mCameraOffset = new PhysicsType2d.Vector2(0, 0);
        /// Track if Heros stick to this WorldActor. The array has 4 positions, corresponding to top,
        /// right, bottom, left
        //boolean[] mIsSticky = new boolean[4];
        /// Disable 3 of 4 sides of a Actors, to allow walking through walls. The value reflects the
        /// side that remains active. 0 is top, 1 is right, 2 is bottom, 3 is left
        this.mIsOneSided = -1;
        /// Actors with a matching nonzero Id don't collide with each other
        this.mPassThroughId = 0;
        this.mGame = game;
    }
    /**
    * Indicate that when this actor stops, we should run custom code
    *
    * @param callback The callback to run when the actor stops
    */
    setStopCallback(callback) {
        let out_this = this;
        this.mScene.mRepeatEvents.push(new (class _ extends LolAction {
            constructor() {
                super(...arguments);
                this.moving = false;
            }
            //@Override
            go() {
                let speed = out_this.mBody.GetLinearVelocity();
                if (!this.moving && (Math.abs(speed.x) > 0 || Math.abs(speed.y) > 0)) {
                    this.moving = true;
                }
                else if (this.moving && speed.x == 0 && speed.y == 0) {
                    callback.go(out_this);
                    this.moving = false;
                }
            }
        })());
    }
    /**
    * Make the camera follow the actor, but without centering the actor on the screen
    *
    * @param x Amount of x distance between actor and center
    * @param y Amount of y distance between actor and center
    */
    setCameraOffset(x, y) {
        this.mCameraOffset.x = x;
        this.mCameraOffset.y = y;
    }
    /**
    * Indicate that the actor should move with the tilt of the phone
    */
    setMoveByTilting() {
        // If we've already added this to the set of tiltable objects, don't do it again
        if (this.mScene.mTiltActors.indexOf(this) < 0) {
            return;
        }
        // make sure it is moveable, add it to the list of tilt actors
        if (this.mBody.GetType() != PhysicsType2d.Dynamics.BodyType.DYNAMIC) {
            this.mBody.SetType(PhysicsType2d.Dynamics.BodyType.DYNAMIC);
        }
        this.mScene.mTiltActors.push(this);
        // turn off sensor behavior, so this collides with stuff...
        this.setCollisionsEnabled(true);
    }
    // /**
    // * Indicate that touching this object will cause some special code to run
    // *
    // * @param activationGoodies1 Number of type-1 goodies that must be collected before it works
    // * @param activationGoodies2 Number of type-2 goodies that must be collected before it works
    // * @param activationGoodies3 Number of type-3 goodies that must be collected before it works
    // * @param activationGoodies4 Number of type-4 goodies that must be collected before it works
    // * @param disappear          True if the actor should disappear when the callback runs
    // * @param callback           The callback to run when the actor is touched
    // */
    // public setTouchCallback(activationGoodies1: number, activationGoodies2: number,
    //   activationGoodies3: number, activationGoodies4: number,
    //   disappear: boolean, callback: LolActorEvent): void {
    //     final int[] touchCallbackActivation = new int[]{activationGoodies1, activationGoodies2,
    //       activationGoodies3, activationGoodies4};
    //       // set the code to run on touch
    //       mTapHandler = new TouchEventHandler() {
    //         public boolean go(float worldX, float worldY) {
    //           // check if we've got enough goodies
    //           boolean match = true;
    //           for (int i = 0; i < 4; ++i)
    //           match &= touchCallbackActivation[i] <= mGame.mManager.mGoodiesCollected[i];
    //           // if so, run the callback
    //           if (match) {
    //             if (disappear)
    //             remove(false);
    //             callback.go(WorldActor.this);
    //           }
    //           return true;
    //         }
    //       };
    //     }
    // /**
    // * Call this on an actor to make it draggable. Be careful when dragging things. If they are
    // * small, they will be hard to touch.
    // *
    // * @param immuneToPhysics Indicate whether the actor should pass through other objects or
    // *                        collide with them
    // */
    // public setCanDrag(immuneToPhysics: boolean): void {
    //   if (immuneToPhysics)
    //   mBody.setType(BodyType.KinematicBody);
    //   else
    //   mBody.setType(BodyType.DynamicBody);
    //   mDragHandler = new TouchEventHandler() {
    //     public boolean go(float worldX, float worldY) {
    //       mBody.setTransform(worldX, worldY, mBody.getAngle());
    //       return true;
    //     }
    //   };
    // }
    // /**
    // * Call this on an actor to make it pokeable. Poke the actor, then poke the screen, and the
    // * actor will move to the location that was pressed. Poke the actor twice in rapid succession to
    // * delete it.
    // *
    // * @param deleteThresholdMillis If two touches happen within this many milliseconds, the actor
    // *                              will be deleted. Use 0 to disable this "delete by double-touch"
    // *                              feature.
    // */
    // public void setPokeToPlace(long deleteThresholdMillis) {
    //   // convert threshold to nanoseconds
    //   final long deleteThreshold = deleteThresholdMillis;
    //   // set the code to run on touch
    //   mTapHandler = new TouchEventHandler() {
    //     long mLastPokeTime;
    //     boolean mRunning = true;
    //
    //     public boolean go(float worldX, float worldY) {
    //       if (!mRunning)
    //       return false;
    //       Lol.vibrate(mScene.mConfig, 100);
    //       long time = System.currentTimeMillis();
    //       // double touch
    //       if ((time - mLastPokeTime) < deleteThreshold) {
    //         // hide actor, disable physics
    //         mBody.setActive(false);
    //         mEnabled = false;
    //         mRunning = false;
    //         return true;
    //       }
    //       // repeat single-touch
    //       else {
    //         mLastPokeTime = time;
    //       }
    //       // set a screen handler to detect when/where to move the actor
    //       mScene.mTapHandlers.add(new TouchEventHandler() {
    //         boolean mIsRunning = true;
    //
    //         public boolean go(float worldX, float worldY) {
    //           if (!mIsRunning || !mEnabled)
    //           return false;
    //           Lol.vibrate(mScene.mConfig, 100);
    //           // move the object
    //           mBody.setTransform(worldX, worldY, mBody.getAngle());
    //           // clear the Level responder
    //           mIsRunning = false;
    //           return true;
    //         }
    //       });
    //       return true;
    //     }
    //   };
    // }
    // /**
    // * Indicate that this actor can be flicked on the screen
    // *
    // * @param dampFactor A value that is multiplied by the vector for the flick, to affect speed
    // */
    // public void setFlickable(final float dampFactor) {
    //   // make sure the body is a dynamic body
    //   setCanFall();
    //
    //   ((MainScene) mScene).mFlingHandlers.add(new TouchEventHandler() {
    //     public boolean go(float worldX, float worldY) {
    //       // note: may need to disable hovering
    //       if (mScene.mHitActor == WorldActor.this) {
    //         mHover = null;
    //         updateVelocity(worldX * dampFactor, worldY * dampFactor);
    //       }
    //       return true;
    //     }
    //   });
    // }
    // /**
    // * Configure an actor so that touching an arbitrary point on the screen makes the actor move
    // * toward that point. The behavior is similar to pokeToPlace, in that one touches the actor,
    // * then where she wants the actor to go. However, this involves moving with velocity, instead of
    // * teleporting
    // *
    // * @param velocity     The constant velocity for poke movement
    // * @param oncePerTouch After starting a path, does the player need to re-select (re-touch) the
    // *                     actor before giving it a new destinaion point?
    // */
    // public void setPokePath(final float velocity, final boolean oncePerTouch) {
    //   if (mBody.getType() == BodyType.StaticBody)
    //   mBody.setType(BodyType.KinematicBody);
    //   mTapHandler = new TouchEventHandler() {
    //     public boolean go(float worldX, float worldY) {
    //       Lol.vibrate(mScene.mConfig, 5);
    //       mScene.mTapHandlers.add(new TouchEventHandler() {
    //         boolean mRunning = true;
    //
    //         public boolean go(float worldX, float worldY) {
    //           if (!mRunning)
    //           return false;
    //           Route r = new Route(2).to(getXPosition(), getYPosition()).to(worldX - mSize.x / 2,
    //             worldY - mSize.y / 2);
    //             setAbsoluteVelocity(0, 0);
    //             setRoute(r, velocity, false);
    //             if (oncePerTouch)
    //             mRunning = false;
    //             return true;
    //           }
    //         });
    //         return true;
    //       }
    //     };
    //   }
    //
    // /**
    // * Configure an actor so that touching an arbitrary point on the screen makes the actor move
    // * toward that point. The behavior is similar to pokePath, except that as the finger moves, the
    // * actor keeps changing its destination accordingly.
    // *
    // * @param velocity     The constant velocity for poke movement
    // * @param oncePerTouch After starting a path, does the player need to re-select (re-touch) the
    // *                     actor before giving it a new destinaion point?
    // * @param stopOnUp     When the touch is released, should the actor stop moving, or continue in
    // *                     the same direction?
    // */
    // public void setFingerChase(final float velocity, final boolean oncePerTouch,
    //   final boolean stopOnUp) {
    //     if (mBody.getType() == BodyType.StaticBody)
    //     mBody.setType(BodyType.KinematicBody);
    //     mTapHandler = new TouchEventHandler() {
    //       public boolean go(float worldX, float worldY) {
    //         Lol.vibrate(mScene.mConfig, 5);
    //
    //         // on a down (or, indirectly, a pan), do this
    //         final TouchEventHandler down = new TouchEventHandler() {
    //           public boolean go(float worldX, float worldY) {
    //             if (!mTapHandler.mIsActive)
    //             return false;
    //             Route r = new Route(2).to(getXPosition(), getYPosition()).to(worldX - mSize.x / 2,
    //               worldY - mSize.y / 2);
    //               setAbsoluteVelocity(0, 0);
    //               setRoute(r, velocity, false);
    //               return true;
    //             }
    //           };
    //           final PanEventHandler pan = new PanEventHandler() {
    //             @Override
    //             public boolean go(float eventPositionX, float eventPositionY, float deltaX, float deltaY) {
    //               return down.go(eventPositionX, eventPositionY);
    //             }
    //           };
    //           // on an up (or a panstop), do this
    //           TouchEventHandler up = new TouchEventHandler() {
    //             public boolean go(float worldX, float worldY) {
    //               if (!mTapHandler.mIsActive)
    //               return false;
    //               if (stopOnUp && mRoute != null)
    //               mRoute.haltRoute();
    //               if (oncePerTouch)
    //               mTapHandler.mIsActive = false;
    //               return true;
    //             }
    //           };
    //           ((MainScene) mScene).mUpHandlers.add(up);
    //           ((MainScene) mScene).mPanStopHandlers.add(up);
    //           ((MainScene) mScene).mDownHandlers.add(down);
    //           ((MainScene) mScene).mPanHandlers.add(pan);
    //           return true;
    //         }
    //       };
    //     }
    // /**
    // * Indicate that this actor should hover at a specific location on the screen, rather than being
    // * placed at some point on the level itself. Note that the coordinates to this command are the
    // * center position of the hovering actor. Also, be careful about using hover with zoom... hover
    // * is relative to screen coordinates (pixels), not world coordinates, so it's going to look
    // * funny to use this with zoom
    // *
    // * @param x the X coordinate (in pixels) where the actor should appear
    // * @param y the Y coordinate (in pixels) where the actor should appear
    // */
    // public void setHover(final int x, final int y) {
    //   mHover = new Vector3();
    //   mScene.mRepeatEvents.add(new LolAction() {
    //     @Override
    //     public void go() {
    //       if (mHover == null)
    //       return;
    //       mHover.x = x;
    //       mHover.y = y;
    //       mHover.z = 0;
    //       mScene.mCamera.unproject(mHover);
    //       mBody.setTransform(mHover.x, mHover.y, mBody.getAngle());
    //     }
    //   });
    // }
    //
    // /**
    // * Make this actor sticky, so that another actor will stick to it
    // *
    // * @param top    Is the top sticky?
    // * @param right  Is the right side sticky?
    // * @param bottom Is the bottom sticky?
    // * @param left   Is the left side sticky?
    // */
    // public void setSticky(boolean top, boolean right, boolean bottom, boolean left) {
    //   mIsSticky = new boolean[]{top, right, bottom, left};
    // }
    //
    // /**
    // * Indicate that touching this actor should make a hero throw a projectile
    // *
    // * @param h         The hero who should throw a projectile when this is touched
    // * @param offsetX   specifies the x distance between the bottom left of the projectile and the
    // *                  bottom left of the hero throwing the projectile
    // * @param offsetY   specifies the y distance between the bottom left of the projectile and the
    // *                  bottom left of the hero throwing the projectile
    // * @param velocityX The X velocity of the projectile when it is thrown
    // * @param velocityY The Y velocity of the projectile when it is thrown
    // */
    // public void setTouchToThrow(final Hero h, final float offsetX, final float offsetY,
    //   final float velocityX, final float velocityY) {
    //     mTapHandler = new TouchEventHandler() {
    //       public boolean go(float worldX, float worldY) {
    //         ((MainScene) mScene).mProjectilePool.throwFixed(h, offsetX, offsetY, velocityX, velocityY);
    //         return true;
    //       }
    //     };
    //   }
    /**
    * Indicate that this obstacle only registers collisions on one side.
    *
    * @param side The side that registers collisions. 0 is top, 1 is right, 2 is bottom, 3 is left,
    *             -1 means "none"
    */
    setOneSided(side) {
        this.mIsOneSided = side;
    }
    /**
    * Indicate that this actor should not have collisions with any other actor that has the same ID
    *
    * @param id The number for this class of non-interacting actors
    */
    setPassThrough(id) {
        this.mPassThroughId = id;
    }
    // /**
    // * Specify that this actor is supposed to chase another actor
    // *
    // * @param speed    The speed with which it chases the other actor
    // * @param target   The actor to chase
    // * @param chaseInX Should the actor change its x velocity?
    // * @param chaseInY Should the actor change its y velocity?
    // */
    // public void setChaseSpeed(final float speed, final WorldActor target, final boolean chaseInX,
    //   final boolean chaseInY) {
    //     mChaseTarget = target;
    //     mBody.setType(BodyType.DynamicBody);
    //     mScene.mRepeatEvents.add(new LolAction() {
    //       @Override
    //       public void go() {
    //         // don't chase something that isn't visible
    //         if (!target.mEnabled)
    //         return;
    //         // don't run if this actor isn't visible
    //         if (!mEnabled)
    //         return;
    //         // compute vector between actors, and normalize it
    //         float x = target.mBody.getPosition().x - mBody.getPosition().x;
    //         float y = target.mBody.getPosition().y - mBody.getPosition().y;
    //         float denom = (float) Math.sqrt(x * x + y * y);
    //         x /= denom;
    //         y /= denom;
    //         // multiply by speed
    //         x *= speed;
    //         y *= speed;
    //         // remove changes for disabled directions, and boost the other
    //         // dimension a little bit
    //         if (!chaseInX) {
    //           x = mBody.getLinearVelocity().x;
    //           y *= 2;
    //         }
    //         if (!chaseInY) {
    //           y = mBody.getLinearVelocity().y;
    //           x *= 2;
    //         }
    //         // apply velocity
    //         updateVelocity(x, y);
    //       }
    //     });
    //   }
    //
    /**
    * Specify that this actor is supposed to chase another actor, but using fixed X/Y velocities
    *
    * @param target     The actor to chase
    * @param xMagnitude The magnitude in the x direction, if ignoreX is false
    * @param yMagnitude The magnitude in the y direction, if ignoreY is false
    * @param ignoreX    False if we should apply xMagnitude, true if we should keep the hero's
    *                   existing X velocity
    * @param ignoreY    False if we should apply yMagnitude, true if we should keep the hero's
    *                   existing Y velocity
    */
    setChaseFixedMagnitude(target, xMagnitude, yMagnitude, ignoreX, ignoreY) {
        this.mChaseTarget = target;
        this.mBody.SetType(PhysicsType2d.Dynamics.BodyType.DYNAMIC);
        let out_this = this;
        this.mScene.mRepeatEvents.push(new (class _ extends LolAction {
            go() {
                // don't chase something that isn't visible
                if (!target.mEnabled)
                    return;
                // don't run if this actor isn't visible
                if (!out_this.mEnabled)
                    return;
                // determine directions for X and Y
                let xDir = (target.getXPosition() > out_this.getXPosition()) ? 1 : -1;
                let yDir = (target.getYPosition() > out_this.getYPosition()) ? 1 : -1;
                let x = (ignoreX) ? out_this.getXVelocity() : xDir * xMagnitude;
                let y = (ignoreY) ? out_this.getYVelocity() : yDir * yMagnitude;
                // apply velocity
                out_this.updateVelocity(x, y);
            }
        })());
    }
    /**
    * Get the actor being chased by this actor
    *
    * @return The actor being chased
    */
    getChaseActor() {
        return this.mChaseTarget;
    }
}
/// <reference path="./WorldActor.ts"/>
/**
 * Destinations are actors that the Hero should try to reach. When a Hero reaches a destination, the
 * Hero disappears, and the score updates.
 */
class Destination extends WorldActor {
    /**
     * Create a basic Destination.  The destination won't yet have any physics attached to it.
     *
     * @param game    The currently active game
     * @param scene   The scene into which the destination is being placed
     * @param width   Width of this destination
     * @param height  Height of this destination
     * @param imgName Name of the image to display
     */
    constructor(game, scene, width, height, imgName) {
        super(game, scene, imgName, width, height);
        this.mCapacity = 1;
        this.mHolding = 0;
        this.mActivation = new Array(4);
        for (let i = 0; i < 4; i++) {
            this.mActivation[i] = 0;
        }
    }
    /**
     * Code to run when a Destination collides with a WorldActor.
     * <p>
     * NB: Destinations are at the end of the collision hierarchy, so we don't do anything when
     * they are in a collision that hasn't already been handled by a higher-ranked WorldActor.
     *
     * @param other   Other actor involved in this collision
     * @param contact A description of the collision
     */
    //@Override
    onCollide(other, contact) {
    }
    /**
     * Change the number of goodies that must be collected before the destination accepts any heroes
     * (the default is 0,0,0,0)
     *
     * @param score1 The number of type-1 goodies that must be collected.
     * @param score2 The number of type-2 goodies that must be collected.
     * @param score3 The number of type-3 goodies that must be collected.
     * @param score4 The number of type-4 goodies that must be collected.
     */
    setActivationScore(score1, score2, score3, score4) {
        this.mActivation[0] = score1;
        this.mActivation[1] = score2;
        this.mActivation[2] = score3;
        this.mActivation[3] = score4;
    }
    /**
     * Change the number of heroes that can be accepted by this destination (the default is 1)
     *
     * @param heroes The number of heroes that can be accepted
     */
    setHeroCount(heroes) {
        this.mCapacity = heroes;
    }
}
/// <reference path="./WorldActor.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>
/**
 * Enemies are things to be avoided or defeated by the Hero. Enemies do damage to heroes when they
 * collide with heroes, and enemies can be defeated by heroes, in a variety of ways.
 */
class Enemy extends WorldActor {
    /**
     * Create a basic Enemy.  The enemy won't yet have any physics attached to it.
     *
     * @param game    The currently active game
     * @param scene   The scene into which the destination is being placed
     * @param width   Width of this enemy
     * @param height  Height of this enemy
     * @param imgName Image to display
     */
    constructor(game, scene, width, height, imgName) {
        super(game, scene, imgName, width, height);
        this.mDamage = 2;
        this.mOnDefeatHeroText = "";
    }
    // /**
    //  * Code to run when an Enemy collides with a WorldActor.
    //  * <p>
    //  * Based on our WorldActor numbering scheme, the only concerns are collisions with Obstacles
    //  * and Projectiles
    //  *
    //  * @param other   Other actor involved in this collision
    //  * @param contact A description of the collision
    //  */
    // @Override
    onCollide(other, contact) {
        // collision with obstacles
        if (other instanceof Obstacle)
            this.onCollideWithObstacle(other, contact);
        // collision with projectiles
        if (other instanceof Projectile)
            this.onCollideWithProjectile(other);
    }
    /**
     * Dispatch method for handling Enemy collisions with Obstacles
     *
     * @param obstacle The obstacle with which this Enemy collided
     * @param contact A description of the collision
     */
    onCollideWithObstacle(obstacle, contact) {
        // handle any callbacks the obstacle has
        if (obstacle.mEnemyCollision != null)
            obstacle.mEnemyCollision.go(obstacle, this, contact);
    }
    /**
     * Dispatch method for handling Enemy collisions with Projectiles
     *
     * @param projectile The projectile with which this Enemy collided
     */
    onCollideWithProjectile(projectile) {
        // ignore inactive projectiles
        if (!projectile.mEnabled)
            return;
        // compute damage to determine if the enemy is defeated
        this.mDamage -= projectile.mDamage;
        if (this.mDamage <= 0) {
            // hide the projectile quietly, so that the sound of the enemy can
            // be heard
            projectile.remove(true);
            // remove this enemy
            this.defeat(true);
        }
        else {
            // hide the projectile
            projectile.remove(false);
        }
    }
    /**
     * Set the amount of damage that this enemy does to a hero
     *
     * @param amount Amount of damage. The default is 2, since heroes have a default strength of 1,
     *               so that the enemy defeats the hero but does not disappear.
     */
    setDamage(amount) {
        this.mDamage = amount;
    }
    /**
     * If this enemy defeats the last hero of the board, this is the message that will be displayed
     *
     * @param message The message to display
     */
    setDefeatHeroText(message) {
        this.mOnDefeatHeroText = message;
    }
    /**
     * When an enemy is defeated, this this code figures out how gameplay should change.
     *
     * @param increaseScore Indicate if we should increase the score when this enemy is defeated
     */
    defeat(increaseScore) {
        // remove the enemy from the screen
        this.remove(false);
        // possibly update score
        if (increaseScore) {
            this.mGame.mManager.onDefeatEnemy();
        }
        // run any defeat callbacks
        if (this.mDefeatCallback != null)
            this.mDefeatCallback.go(this);
    }
    /**
     * Indicate that this enemy can be defeated by crawling into it
     */
    setDefeatByCrawl() {
        this.mDefeatByCrawl = true;
        // make sure heroes don't ricochet off of this enemy when defeating it via crawling
        this.setCollisionsEnabled(false);
    }
    /**
     * Mark this enemy as one that can be defeated by jumping
     */
    setDefeatByJump() {
        this.mDefeatByJump = true;
    }
    /**
     * Make this enemy resist invincibility
     */
    setResistInvincibility() {
        this.mImmuneToInvincibility = true;
    }
    /**
     * Make this enemy damage the hero even when the hero is invincible
     */
    setImmuneToInvincibility() {
        this.mAlwaysDoesDamage = true;
    }
    // /**
    //  * Indicate that if the player touches this enemy, the enemy will be removed from the game
    //  */
    // public void setDisappearOnTouch() {
    //     mTapHandler = new TouchEventHandler() {
    //         public boolean go(float worldX, float worldY) {
    //             Lol.vibrate(mScene.mConfig, 100);
    //             defeat(true);
    //             mTapHandler = null;
    //             return true;
    //         }
    //     };
    // }
    /**
     * Provide code to run when this Enemy is defeated
     *
     * @param callback The callback to run when the enemy is defeated.  Note that a value of
     *                 <code>null</code> will remove a previously-set callback
     */
    setDefeatCallback(callback) {
        this.mDefeatCallback = callback;
    }
}
/// <reference path="./WorldActor.ts"/>
/**
* Goodies are actors that a hero can collect.
* <p>
* Collecting a goodie has three possible consequences: it can change the score, it can change the
* hero's strength, and it can make the hero invincible
*/
class Goodie extends WorldActor {
    /**
    * Create a basic Goodie.  The goodie won't yet have any physics attached to it.
    *
    * @param game    The currently active game
    * @param scene   The scene into which the destination is being placed
    * @param width   width of this Goodie
    * @param height  height of this Goodie
    * @param imgName image to use for this Goodie
    */
    constructor(game, scene, width, height, imgName) {
        super(game, scene, imgName, width, height);
        this.mStrengthBoost = 0;
        this.mInvincibilityDuration = 0;
        this.mScore = new Array();
        this.mScore[0] = 1;
        this.mScore[1] = 0;
        this.mScore[2] = 0;
        this.mScore[3] = 0;
    }
    /**
    * Code to run when a Goodie collides with a WorldActor.
    * <p>
    * NB: Goodies are at the end of the collision hierarchy, so we don't do anything when
    * they are in a collision that hasn't already been handled by a higher-ranked WorldActor.
    *
    * @param other   Other object involved in this collision
    * @param contact A description of the contact that caused this collision
    */
    //@Override
    onCollide(other, contact) {
    }
}
/**
 * LolAction describes code that runs in response to events.  LolAction is only intended for events
 * that take no parameters, such as events that run on a timer.
 */
class LolAction {
    constructor() {
        /// A flag to disable and re-enable actions.  This is especially useful when a LolAction is on
        /// a repeating timer.
        this.mIsActive = true;
    }
}
/// <reference path="./Camera.ts" />
/// <reference path="./LolAction.ts" />
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>
// ^this isn't working properly right now
/**
 * LolScene is the parent of all Scene types
 * <p>
 * A Scene consists of a physics world and a bunch of actors who exist within that world.  Notably,
 * a Scene can be rendered, which advances its physics world.
 * <p>
 * There is a close relationship between a BaseActor and a LolScene, namely that a BaseActor should
 * not need any scene functionality that is not present in LolScene.
 */
class LolScene {
    /**
     * Construct a new scene
     *
     * @param media  All image and sound assets for the game
     * @param config The game-wide configuration
     */
    constructor(config, media) {
        this.mContainer = new PIXI.Container();
        this.mConfig = config;
        this.mMedia = media;
        let w = config.mWidth; // config.mPixelMeterRatio;
        let h = config.mHeight; // config.mPixelMeterRatio;
        this.mContainer.position.x = 0;
        this.mContainer.position.y = 0;
        // set up the event lists
        this.mOneTimeEvents = new Array();
        this.mRepeatEvents = new Array();
        // set up the game camera, with (0, 0) in the top left
        this.mCamera = new Camera(w, h);
        //this.mCamera.centerOn(w / 2, h / 2);
        this.mCamera.setPosition(0, 0);
        this.mCamera.setZoom(1);
        // set default camera bounds
        this.mCamBound = new PhysicsType2d.Vector2(w, h);
        // create a world with no default gravitational forces
        this.mWorld = new PhysicsType2d.Dynamics.World(new PhysicsType2d.Vector2(0, 0));
        // set up the containers for holding anything we can render
        this.mRenderables = new Array(5);
        for (let i = 0; i < 5; ++i) {
            this.mRenderables[i] = new Array();
        }
    }
    /**
     * Add an actor to the level, putting it into the appropriate z plane
     *
     * @param actor  The actor to add
     * @param zIndex The z plane. valid values are -2, -1, 0, 1, and 2. 0 is the default.
     */
    addActor(actor, zIndex) {
        // Coerce index into legal range, then add the actor
        zIndex = (zIndex < -2) ? -2 : zIndex;
        zIndex = (zIndex > 2) ? 2 : zIndex;
        this.mRenderables[zIndex + 2].push(actor);
        this.mCamera.mContainer.removeChildren();
        this.mContainer.removeChildren();
        for (let i = 0; i < 5; i++) {
            for (let a of this.mRenderables[i]) {
                if (a.mSprite)
                    this.mContainer.addChild(a.mSprite);
                if (a.mText)
                    this.mContainer.addChild(a.mText);
            }
        }
        this.mCamera.mContainer.addChild(this.mContainer);
    }
    /**
    * Remove an actor from its z plane
    *
    * @param actor  The actor to remove
    * @param zIndex The z plane where it is expected to be
    */
    removeActor(actor, zIndex) {
        // Coerce index into legal range, then remove the actor
        zIndex = (zIndex < -2) ? -2 : zIndex;
        zIndex = (zIndex > 2) ? 2 : zIndex;
        let i = this.mRenderables[zIndex + 2].indexOf(actor);
        this.mRenderables[zIndex + 2].splice(i, 1);
        if (actor.mSprite)
            this.mContainer.removeChild(actor.mSprite);
        if (actor.mText)
            this.mContainer.removeChild(actor.mText);
        this.mCamera.mContainer.addChild(this.mContainer);
    }
    /**
    * Reset a scene by clearing all of its lists
    */
    reset() {
        //this.mTapHandlers.length = 0;
        this.mOneTimeEvents.length = 0;
        this.mRepeatEvents.length = 0;
        for (let a of this.mRenderables) {
            a.length = 0;
        }
    }
    /**
    * Add an image to the scene.  The image will not have any physics attached to it.
    *
    * @param x       The X coordinate of the top left corner, in meters
    * @param y       The Y coordinate of the top left corner, in meters
    * @param width   The image width, in meters
    * @param height  The image height, in meters
    * @param imgName The file name for the image, or ""
    * @param zIndex  The z index of the text
    * @return A Renderable of the image, so it can be enabled/disabled by program code
    */
    makePicture(x, y, width, height, imgName, zIndex) {
        // set up the image to display
        // NB: this will fail gracefully (no crash) for invalid file names
        //final TextureRegion tr = mMedia.getImage(imgName);
        let r = new (class _ extends Renderable {
            //@Override
            onRender() {
            }
        })();
        r.mSprite = new PIXI.Sprite(PIXI.loader.resources[imgName].texture);
        r.mSprite.position.x = x;
        r.mSprite.position.y = y;
        r.mSprite.height = height;
        r.mSprite.width = width;
        this.addActor(r, zIndex);
        return r;
    }
    /**
     * Draw some text in the scene, using a top-left coordinate
     *
     * @param x         The x coordinate of the top left corner
     * @param y         The y coordinate of the top left corner
     * @param fontName  The name of the font to use
     * @param fontColor The color of the font
     * @param fontSize  The size of the font
     * @param prefix    Prefix text to put before the generated text
     * @param suffix    Suffix text to put after the generated text
     * @param tp        A TextProducer that will generate the text to display
     * @param zIndex    The z index of the text
     * @return A Renderable of the text, so it can be enabled/disabled by program code
     */
    addText(x, y, fontName, fontColor, fontSize, prefix, suffix, tp, zIndex) {
        let out_this = this;
        // Create a renderable that updates its text on every render, and add it to the scene
        let d = new (class _ extends Renderable {
            //@Override
            onRender() {
                let txt = prefix + tp.makeText() + suffix;
                this.mText.text = txt;
            }
        })();
        let txt = prefix + tp.makeText() + suffix;
        let newText = new PIXI.Text(txt, { fontFamily: fontName, fontSize: fontSize, fill: fontColor, align: 'left' });
        d.mText = newText;
        d.mText.position.x = x;
        d.mText.position.y = y;
        this.addActor(d, zIndex);
        return d;
    }
    /**
     * Draw some text in the scene, using a top-left coordinate
     *
     * @param x         The x coordinate of the top left corner
     * @param y         The y coordinate of the top left corner
     * @param fontName  The name of the font to use
     * @param fontColor The color of the font
     * @param fontSize  The size of the font
     * @param text      Text to put on screen
     * @param zIndex    The z index of the text
     * @return A Renderable of the text, so it can be enabled/disabled by program code
     */
    addStaticText(x, y, fontName, fontColor, fontSize, text, zIndex) {
        // Create a renderable that updates its text on every render, and add it to the scene
        let d = new (class _ extends Renderable {
            //@Override
            onRender() { }
        })();
        let newText = new PIXI.Text(text, { fontFamily: fontName, fontSize: fontSize, fill: fontColor, align: 'left' });
        d.mText = newText;
        d.mText.position.x = x;
        d.mText.position.y = y;
        this.addActor(d, zIndex);
        return d;
    }
    /**
     * Draw some text in the scene, using the middle coordinate
     *
     * @param x         The x coordinate of the middle of the text
     * @param y         The y coordinate of the middle of the text
     * @param fontName  The name of the font to use
     * @param fontColor The color of the font
     * @param fontSize  The size of the font
     * @param text      Text to put on screen
     * @param zIndex    The z index of the text
     * @return A Renderable of the text, so it can be enabled/disabled by program code
     */
    addStaticTextCentered(x, y, fontName, fontColor, fontSize, text, zIndex) {
        // Create a renderable that updates its text on every render, and add it to the scene
        let d = new (class _ extends Renderable {
            //@Override
            onRender() { }
        })();
        let newText = new PIXI.Text(text, { fontFamily: fontName, fontSize: fontSize, fill: fontColor, align: 'center' });
        d.mText = newText;
        d.mText.anchor.x = 0.5;
        d.mText.anchor.y = 0.5;
        d.mText.position.x = x;
        d.mText.position.y = y;
        this.addActor(d, zIndex);
        return d;
    }
    /**
     * Draw some text in the scene, centering it on a specific point
     *
     * @param centerX   The x coordinate of the center
     * @param centerY   The y coordinate of the center
     * @param fontName  The name of the font to use
     * @param fontColor The color of the font
     * @param fontSize  The size of the font
     * @param prefix    Prefix text to put before the generated text
     * @param suffix    Suffix text to put after the generated text
     * @param tp        A TextProducer that will generate the text to display
     * @param zIndex    The z index of the text
     * @return A Renderable of the text, so it can be enabled/disabled by program code
     */
    addTextCentered(centerX, centerY, fontName, fontColor, fontSize, prefix, suffix, tp, zIndex) {
        let out_this = this;
        // Create a renderable that updates its text on every render, and add it to the scene
        let d = new (class _ extends Renderable {
            //@Override
            onRender() {
                let txt = prefix + tp.makeText() + suffix;
                this.mText.text = txt;
            }
        })();
        let txt = prefix + tp.makeText() + suffix;
        let newText = new PIXI.Text(txt, { fontFamily: fontName, fontSize: fontSize, fill: fontColor, align: 'center' });
        d.mText = newText;
        d.mText.position.x = centerX;
        d.mText.position.y = centerY;
        this.addActor(d, zIndex);
        return d;
    }
}
/// <reference path="./Config.ts"/>
class Media {
    /**
     * Construct a Media object by loading all images and sounds
     *
     * @param config The game-wide configuration object, which contains lists of images and sounds
     */
    constructor(config) {
        this.mConfig = config;
        this.mSounds = new Map();
        this.mTunes = new Map();
        for (let imgName of config.mImageNames) {
            //let texture: PIXI.Texture
            //PIXI has a built-in image loader
            PIXI.loader.add(imgName);
            //this.mImages.set(imgName, texture);
        }
        //PIXI.loader.load();
        for (let soundName of config.mSoundNames) {
            let s = new Sound(soundName);
            this.mSounds.set(soundName, s);
        }
        for (let musicName of config.mMusicNames) {
            let m = new Sound(musicName);
            m.setLooping(true);
            this.mTunes.set(musicName, m);
        }
    }
    /**
     * Get a previously loaded Sound object
     *
     * @param soundName Name of the sound file to retrieve
     * @return a Sound object that can be used for sound effects
     */
    getSound(soundName) {
        let ret = this.mSounds.get(soundName);
        if (ret == null) {
            Lol.message(this.mConfig, "ERROR", "Error retrieving sound '" + soundName + "'");
        }
        return ret;
    }
    /**
     * Get a previously loaded Music object
     *
     * @param musicName Name of the music file to retrieve
     * @return a Music object that can be used to play background music
     */
    getMusic(musicName) {
        let ret = this.mTunes.get(musicName);
        if (ret == null) {
            Lol.message(this.mConfig, "ERROR", "Error retrieving music '" + musicName + "'");
        }
        return ret;
    }
}
/// <reference path="./LolScene.ts" />
/// <reference path="./Media.ts" />
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>
class HudScene extends LolScene {
    /// The set of all controls that have toggle handlers.  We need this, so we can "lift" toggles
    /// on screen change evenrs
    //readonly mToggleControls: Array<SceneActor>;
    /**
    * Create a new heads-up display by providing the dimensions for its camera
    *
    * @param media  All image and sound assets for the game
    * @param config The game-wide configuration
    */
    constructor(config, media) {
        super(config, media);
        //this.mToggleControls = new Array<SceneActor>();
    }
    /**
    * Draw the Hud
    *
    * @param sb    The spritebatch to use when drawing
    * @param delta The time since the last render
    */
    render() {
        //this.mCamera.updatePosition();
        // Advance the physics world by 1/45 of a second (1/45 is the recommended rate)
        this.mWorld.Step(1 / 45, 8, 3);
        // Render all actors and text
        //sb.setProjectionMatrix(mCamera.combined);
        //sb.begin();
        for (let zA of this.mRenderables) {
            for (let r of zA) {
                r.render();
            }
        }
        //sb.end();
        // TODO: box2d shape renderer for controls2
        // if (mConfig.mShowDebugBoxes) {
        // }
        return true;
    }
}
/**
 * TouchEventHandler is a wrapper for code that ought to run in response to a touch event.
 *
 * We can use TouchEventHandlers to specify how a game should respond to a taps, pan stops, and
 * other touch events
 */
class TouchEventHandler {
    constructor() {
        /// A flag to control whether the event is allowed to execute or not
        this.mIsActive = true;
        /// The actor who generated this touch event
        this.mSource = null;
    }
}
//// <reference path="./Hero.ts"/>
//// <reference path="./Enemy.ts"/>
/// <reference path="./TouchEventHandler.ts"/>
//// <reference path="./LolAction.ts"/>
/// <reference path="./LolScene.ts"/>
//// <reference path="./Config.ts"/>
//// <reference path="./Media.ts"/>
/// <reference path="./WorldActor.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>
class MainScene extends LolScene {
    /// A random number generator... We provide this so that new game developers don't create lots
    /// of Random()s throughout their code
    //final Random mGenerator;
    constructor(config, media) {
        super(config, media);
        /// A multiplier to make gravity change faster or slower than the accelerometer default
        this.mTiltMultiplier = 1;
        this.configureCollisionHandlers();
    }
    //   /**
    //  * The main render loop calls this to determine what to do when there is a phone tilt
    //  */
    // void handleTilt() {
    //     if (mTiltMax == null)
    //         return;
    //
    //     // these temps are for storing the accelerometer forces we measure
    //     float xGravity = 0;
    //     float yGravity = 0;
    //
    //     // if we're on a phone, read from the accelerometer device, taking into account the rotation
    //     // of the device
    //     Application.ApplicationType appType = Gdx.app.getType();
    //     if (appType == Application.ApplicationType.Android || appType == Application.ApplicationType.iOS) {
    //         float rot = Gdx.input.getRotation();
    //         if (rot == 0) {
    //             xGravity = -Gdx.input.getAccelerometerX();
    //             yGravity = -Gdx.input.getAccelerometerY();
    //         } else if (rot == 90) {
    //             xGravity = Gdx.input.getAccelerometerY();
    //             yGravity = -Gdx.input.getAccelerometerX();
    //         } else if (rot == 180) {
    //             xGravity = Gdx.input.getAccelerometerX();
    //             yGravity = Gdx.input.getAccelerometerY();
    //         } else if (rot == 270) {
    //             xGravity = -Gdx.input.getAccelerometerY();
    //             yGravity = Gdx.input.getAccelerometerX();
    //         }
    //     }
    //     // if we're on a computer, we simulate tilt with the arrow keys
    //     else {
    //         if (Gdx.input.isKeyPressed(Input.Keys.DPAD_LEFT))
    //             xGravity = -15f;
    //         else if (Gdx.input.isKeyPressed(Input.Keys.DPAD_RIGHT))
    //             xGravity = 15f;
    //         else if (Gdx.input.isKeyPressed(Input.Keys.DPAD_UP))
    //             yGravity = 15f;
    //         else if (Gdx.input.isKeyPressed(Input.Keys.DPAD_DOWN))
    //             yGravity = -15f;
    //     }
    //
    //     // Apply the gravity multiplier
    //     xGravity *= mTiltMultiplier;
    //     yGravity *= mTiltMultiplier;
    //
    //     // ensure x is within the -GravityMax.x : GravityMax.x range
    //     xGravity = (xGravity > mConfig.mPixelMeterRatio * mTiltMax.x) ?
    //             mConfig.mPixelMeterRatio * mTiltMax.x : xGravity;
    //     xGravity = (xGravity < mConfig.mPixelMeterRatio * -mTiltMax.x) ?
    //             mConfig.mPixelMeterRatio * -mTiltMax.x : xGravity;
    //
    //     // ensure y is within the -GravityMax.y : GravityMax.y range
    //     yGravity = (yGravity > mConfig.mPixelMeterRatio * mTiltMax.y) ?
    //             mConfig.mPixelMeterRatio * mTiltMax.y : yGravity;
    //     yGravity = (yGravity < mConfig.mPixelMeterRatio * -mTiltMax.y) ?
    //             mConfig.mPixelMeterRatio * -mTiltMax.y : yGravity;
    //
    //     // If we're in 'velocity' mode, apply the accelerometer reading to each
    //     // actor as a fixed velocity
    //     if (mTiltVelocityOverride) {
    //         // if X is clipped to zero, set each actor's Y velocity, leave X
    //         // unchanged
    //         if (mTiltMax.x == 0) {
    //             for (WorldActor gfo : mTiltActors)
    //                 if (gfo.mBody.isActive())
    //                     gfo.updateVelocity(gfo.mBody.getLinearVelocity().x, yGravity);
    //         }
    //         // if Y is clipped to zero, set each actor's X velocity, leave Y
    //         // unchanged
    //         else if (mTiltMax.y == 0) {
    //             for (WorldActor gfo : mTiltActors)
    //                 if (gfo.mBody.isActive())
    //                     gfo.updateVelocity(xGravity, gfo.mBody.getLinearVelocity().y);
    //         }
    //         // otherwise we set X and Y velocity
    //         else {
    //             for (WorldActor gfo : mTiltActors)
    //                 if (gfo.mBody.isActive())
    //                     gfo.updateVelocity(xGravity, yGravity);
    //         }
    //     }
    //     // when not in velocity mode, apply the accelerometer reading to each
    //     // actor as a force
    //     else {
    //         for (WorldActor gfo : mTiltActors)
    //             if (gfo.mBody.isActive())
    //                 gfo.mBody.applyForceToCenter(xGravity, yGravity, true);
    //     }
    // }
    //
    // /**
    //  * When a hero collides with a "sticky" obstacle, this figures out what to do
    //  *
    //  * @param sticky  The sticky actor... it should always be an obstacle for now
    //  * @param other   The other actor... it should always be a hero for now
    //  * @param contact A description of the contact event
    //  */
    // private void handleSticky(final WorldActor sticky, final WorldActor other, Contact contact) {
    //     // don't create a joint if we've already got one
    //     if (other.mDJoint != null)
    //         return;
    //     // don't create a joint if we're supposed to wait
    //     if (System.currentTimeMillis() < other.mStickyDelay)
    //         return;
    //     // go sticky obstacles... only do something if we're hitting the
    //     // obstacle from the correct direction
    //     if ((sticky.mIsSticky[0] && other.getYPosition() >= sticky.getYPosition() + sticky.mSize.y)
    //             || (sticky.mIsSticky[1] && other.getXPosition() + other.mSize.x <= sticky.getXPosition())
    //             || (sticky.mIsSticky[3] && other.getXPosition() >= sticky.getXPosition() + sticky.mSize.x)
    //             || (sticky.mIsSticky[2] && other.getYPosition() + other.mSize.y <= sticky.getYPosition())) {
    //         // create distance and weld joints... somehow, the combination is needed to get this to
    //         // work. Note that this function runs during the box2d step, so we need to make the
    //         // joint in a callback that runs later
    //         final Vector2 v = contact.getWorldManifold().getPoints()[0];
    //         mOneTimeEvents.add(new LolAction() {
    //             @Override
    //             public void go() {
    //                 other.mBody.setLinearVelocity(0, 0);
    //                 DistanceJointDef d = new DistanceJointDef();
    //                 d.initialize(sticky.mBody, other.mBody, v, v);
    //                 d.collideConnected = true;
    //                 other.mDJoint = (DistanceJoint) mWorld.createJoint(d);
    //                 WeldJointDef w = new WeldJointDef();
    //                 w.initialize(sticky.mBody, other.mBody, v);
    //                 w.collideConnected = true;
    //                 other.mWJoint = (WeldJoint) mWorld.createJoint(w);
    //             }
    //         });
    //     }
    // }
    /**
    * Configure physics for the current level
    */
    configureCollisionHandlers() {
        // set up the collision handlers
        this.mWorld.SetContactListener(new (class myContactListener extends PhysicsType2d.Dynamics.ContactListener {
            constructor(superThis) {
                super();
                this.superThis = superThis;
            }
            /**
            * When two bodies start to collide, we can use this to forward to our onCollide methods
            *
            * @param contact A description of the contact event
            */
            //@Override
            BeginContact(contact) {
                // Get the bodies, make sure both are actors
                let a = contact.GetFixtureA().GetBody().GetUserData(); //any type
                let b = contact.GetFixtureB().GetBody().GetUserData(); //any type
                if (!(a instanceof WorldActor) || !(b instanceof WorldActor)) {
                    console.log("Not a WorldActor");
                    return;
                }
                // the order is Hero, Enemy, Goodie, Projectile, Obstacle, Destination
                //
                // Of those, Hero, Enemy, and Projectile are the only ones with
                // a non-empty onCollide
                let c0;
                let c1;
                if (a instanceof Hero) {
                    c0 = a;
                    c1 = b;
                }
                else if (b instanceof Hero) {
                    c0 = b;
                    c1 = a;
                }
                else if (a instanceof Enemy) {
                    c0 = a;
                    c1 = b;
                }
                else if (b instanceof Enemy) {
                    c0 = b;
                    c1 = a;
                }
                else if (a instanceof Projectile) {
                    c0 = a;
                    c1 = b;
                }
                else if (b instanceof Projectile) {
                    c0 = b;
                    c1 = a;
                }
                else {
                    return;
                }
                // Schedule an event to run as soon as the physics world finishes its step.
                //
                // NB: this is called from render, while world is updating.  We can't modify the
                // world or its actors until the update finishes, so we have to schedule
                // collision-based updates to run after the world update.
                this.superThis.mOneTimeEvents.push(new (class _ extends LolAction {
                    //@Override
                    go() {
                        c0.onCollide(c1, contact);
                    }
                })());
            }
            /**
            * We ignore endcontact
            *
            * @param contact A description of the contact event
            */
            //@Override
            EndContact(contact) {
            }
            /**
            * Presolve is a hook for disabling certain collisions. We use it
            * for collision immunity, sticky obstacles, and one-way walls
            *
            * @param contact A description of the contact event
            * @param oldManifold The manifold from the previous world step
            */
            //@Override
            PreSolve(contact, oldManifold) {
                // get the bodies, make sure both are actors
                let a = contact.GetFixtureA().GetBody().GetUserData();
                let b = contact.GetFixtureB().GetBody().GetUserData();
                if (!(a instanceof WorldActor) || !(b instanceof WorldActor))
                    return;
                let gfoA = a;
                let gfoB = b;
                //  // go sticky obstacles... only do something if at least one actor is a sticky actor
                //  if (gfoA.mIsSticky[0] || gfoA.mIsSticky[1] || gfoA.mIsSticky[2] || gfoA.mIsSticky[3]) {
                //      handleSticky(gfoA, gfoB, contact);
                //      return;
                //  } else if (gfoB.mIsSticky[0] || gfoB.mIsSticky[1] || gfoB.mIsSticky[2] || gfoB.mIsSticky[3]) {
                //      handleSticky(gfoB, gfoA, contact);
                //      return;
                //  }
                // if the actors have the same passthrough ID, and it's  not zero, then disable the
                // contact
                if (gfoA.mPassThroughId != 0 && gfoA.mPassThroughId == gfoB.mPassThroughId) {
                    contact.SetEnabled(false);
                    return;
                }
                // is either one-sided? If not, we're done
                let oneSided;
                let other;
                if (gfoA.mIsOneSided > -1) {
                    oneSided = gfoA;
                    other = gfoB;
                }
                else if (gfoB.mIsOneSided > -1) {
                    oneSided = gfoB;
                    other = gfoA;
                }
                else {
                    return;
                }
                //if we're here, see if we should be disabling a one-sided obstacle collision
                let worldManiFold = contact.GetWorldManifold();
                let numPoints = worldManiFold.points.length;
                for (let i = 0; i < numPoints; i++) {
                    let vector2 = other.mBody.GetLinearVelocityFromWorldPoint(worldManiFold.points[i]);
                    // disable based on the value of isOneSided and the vector between the actors
                    if (oneSided.mIsOneSided == 0 && vector2.y < 0)
                        contact.SetEnabled(false);
                    else if (oneSided.mIsOneSided == 2 && vector2.y > 0)
                        contact.SetEnabled(false);
                    else if (oneSided.mIsOneSided == 1 && vector2.x > 0)
                        contact.SetEnabled(false);
                    else if (oneSided.mIsOneSided == 3 && vector2.x < 0)
                        contact.SetEnabled(false);
                }
            }
            /**
            * We ignore postsolve
            *
            * @param contact A description of the contact event
            * @param impulse The impulse of the contact
            */
            //@Override
            PostSolve(contact, impulse) {
            }
        })(this));
    }
    /**
     * If the level has music attached to it, this starts playing it
     */
    playMusic() {
        if (!this.mMusicPlaying && this.mMusic) {
            this.mMusicPlaying = true;
            this.mMusic.play();
        }
    }
    /**
     * If the level has music attached to it, this pauses it
     */
    pauseMusic() {
        if (this.mMusicPlaying) {
            this.mMusicPlaying = false;
            this.mMusic.stop();
        }
    }
    /**
     * If the level has music attached to it, this stops it
     */
    stopMusic() {
        if (this.mMusicPlaying) {
            this.mMusicPlaying = false;
            this.mMusic.stop();
        }
    }
    /**
    * If the camera is supposed to follow an actor, this code will handle updating the camera
    * position
    */
    adjustCamera() {
        if (!this.mChaseActor) {
            return;
        }
        // figure out the actor's position
        let x = this.mChaseActor.mBody.GetWorldCenter().x + this.mChaseActor.mCameraOffset.x;
        let y = this.mChaseActor.mBody.GetWorldCenter().y + this.mChaseActor.mCameraOffset.y;
        // // if x or y is too close to MAX,MAX, stick with max acceptable values
        // if (x > this.mCamBound.x - ((this.mConfig.mWidth / 2) / this.mCamera.getZoom())) { //  / this.mConfig.mPixelMeterRatio / 2) {
        //   x = this.mCamBound.x - ((this.mConfig.mWidth / 2) / this.mCamera.getZoom()); //* this.mCamera.getZoom() / this.mConfig.mPixelMeterRatio / 2;
        // }
        // if (y > this.mCamBound.y - ((this.mConfig.mHeight / 2) / this.mCamera.getZoom())) { // / this.mConfig.mPixelMeterRatio / 2) {
        //   y = this.mCamBound.y - ((this.mConfig.mHeight / 2) / this.mCamera.getZoom()); //* this.mCamera.getZoom() / this.mConfig.mPixelMeterRatio / 2;
        // }
        // // if x or y is too close to 0,0, stick with minimum acceptable values
        // //
        // // NB: we do MAX before MIN, so that if we're zoomed out, we show extra
        // // space at the top instead of the bottom
        // if (x < (this.mConfig.mWidth / 2) / this.mCamera.getZoom()) { //  / this.mConfig.mPixelMeterRatio / 2) {
        //   x = (this.mConfig.mWidth / 2) / this.mCamera.getZoom(); // * this.mCamera.getZoom() / this.mConfig.mPixelMeterRatio / 2;
        // }
        // if (y < (this.mConfig.mHeight / 2) / this.mCamera.getZoom()) { //* this.mCamera.getZoom() / this.mConfig.mPixelMeterRatio / 2) {
        //   y = (this.mConfig.mHeight / 2) / this.mCamera.getZoom(); // * this.mCamera.getZoom() / this.mConfig.mPixelMeterRatio / 2;
        // }
        // update the camera position
        this.mCamera.centerOn(x, y);
        this.mCamera.setPosition(this.mConfig.mWidth / 2, this.mConfig.mHeight / 2);
    }
    // /**
    // * Respond to a fling gesture
    // *
    // * @param velocityX The X velocity of the fling
    // * @param velocityY The Y velocity of the fling
    // * @return True if the gesture was handled
    // */
    // handleFling(velocityX: number, velocityY: number): boolean {
    //   // we only fling at the whole-level layer
    //   mCamera.unproject(mTouchVec.set(velocityX, velocityY, 0));
    //   for (TouchEventHandler ga : mFlingHandlers) {
    //     if (ga.go(mTouchVec.x, mTouchVec.y))
    //     return true;
    //   }
    //   return false;
    // }
    // /**
    // * Respond to a Pan gesture
    // *
    // * @param x      The screen X of the pan
    // * @param y      The screen Y of the pan
    // * @param deltaX The change in X since last pan
    // * @param deltaY The change in Y since last pan
    // * @return True if the pan was handled, false otherwise
    // */
    // boolean handlePan(float x, float y, float deltaX, float deltaY) {
    //   mCamera.unproject(mTouchVec.set(x, y, 0));
    //   for (PanEventHandler ga : mPanHandlers) {
    //     if (ga.go(mTouchVec.x, mTouchVec.y, deltaX, deltaY))
    //     return true;
    //   }
    //   return false;
    // }
    // /**
    // * Respond to a pan stop event
    // *
    // * @param x The screen X of the pan stop event
    // * @param y The screen Y of the pan stop event
    // * @return True if the pan stop was handled, false otherwise
    // */
    // boolean handlePanStop(float x, float y) {
    //   // go panstop on level
    //   mCamera.unproject(mTouchVec.set(x, y, 0));
    //   for (TouchEventHandler ga : mPanStopHandlers)
    //   if (ga.go(mTouchVec.x, mTouchVec.y))
    //   return true;
    //   return false;
    // }
    // /**
    // * Respond to a Down screenpress
    // *
    // * @param screenX The screen X coordinate of the Down
    // * @param screenY The screen Y coordinate of the Down
    // * @return True if the Down was handled, false otherwise
    // */
    // handleDown(screenX: number, screenY: number): boolean {
    //   // check for actor touch by looking at gameCam coordinates... on touch, hitActor will change
    //   this.mHitActor = null;
    //   //this.mCamera.unproject(mTouchVec.set(screenX, screenY, 0));
    //   this.mWorld.QueryAABB(this.mTouchCallback, new PhysicsType2d.Collision.AxisAlignedBoundingBox(this.mTouchVec.x - 0.1, this.mTouchVec.y - 0.1,
    //     this.mTouchVec.x + 0.1, this.mTouchVec.y + 0.1));
    //
    //     // actors don't respond to DOWN... if it's a down on an actor, we are supposed to remember
    //     // the most recently touched actor, and that's it
    //     if (this.mHitActor != null) {
    //       if (this.mHitActor.mToggleHandler != null) {
    //         if (this.mHitActor.mToggleHandler.go(false, this.mTouchVec.x, this.mTouchVec.y)) {
    //           return true;
    //         }
    //       }
    //     }
    //
    //     // forward to the level's handler
    //     for (TouchEventHandler ga : mDownHandlers) {
    //       if (ga.go(mTouchVec.x, mTouchVec.y)) {
    //         return true;
    //       }
    //     }
    //     return false;
    //   }
    // /**
    //  * Respond to a Up screen event
    //  *
    //  * @param screenX The screen X coordinate of the Up
    //  * @param screenY The screen Y coordinate of the Up
    //  * @return True if the Up was handled, false otherwise
    //  */
    // boolean handleUp(float screenX, float screenY) {
    //     mCamera.unproject(mTouchVec.set(screenX, screenY, 0));
    //     if (mHitActor != null) {
    //         if (mHitActor.mToggleHandler != null) {
    //             if (mHitActor.mToggleHandler.go(true, mTouchVec.x, mTouchVec.y)) {
    //                 mHitActor = null;
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
    // /**
    //  * Respond to a Drag screen event
    //  *
    //  * @param screenX The screen X coordinate of the Drag
    //  * @param screenY The screen Y coordinate of the Drag
    //  * @return True if the Drag was handled, false otherwise
    //  */
    // boolean handleDrag(float screenX, float screenY) {
    //     if (mHitActor != null && ((WorldActor) mHitActor).mDragHandler != null) {
    //         mCamera.unproject(mTouchVec.set(screenX, screenY, 0));
    //         return ((WorldActor) mHitActor).mDragHandler.go(mTouchVec.x, mTouchVec.y);
    //     }
    //     return false;
    // }
    //
    // /**
    //  * A hack for stopping events when a pause screen is opened
    //  *
    //  * @param touchX The x coordinate of the touch that is being lifted
    //  * @param touchY The y coordinate of the touch that is being lifted
    //  */
    // void liftAllButtons(float touchX, float touchY) {
    //     for (TouchEventHandler ga : mPanStopHandlers) {
    //         ga.go(touchX, touchY);
    //     }
    //     for (TouchEventHandler ga : mUpHandlers) {
    //         ga.go(touchX, touchY);
    //     }
    // }
    /**
    * Draw the actors in this world
    *
    * @param sb    The spritebatch to use when drawing
    * @param delta The time since the last render
    */
    render() {
        for (let zA of this.mRenderables) {
            for (let r of zA) {
                r.render();
            }
        }
        return true;
    }
}
/// <reference path="./LolScene.ts"/>
class QuickScene extends LolScene {
    /**
     * Construct a QuickScene with default show and dismiss behaviors
     *
     * @param media       The media object, with all loaded sound and image files
     * @param config      The game-wide configuration
     * @param defaultText The default text to display, centered, on this QuickScene
     */
    constructor(config, media, defaultText) {
        super(config, media);
        this.mClickToClear = true;
        this.mText = defaultText;
        let out_this = this;
        // Set the default dismiss action to clear the screen and fix the timers
        this.mDismissAction = new (class _ extends LolAction {
            //@Override
            go() {
                if (out_this.mClickToClear) {
                    let showTime = (new Date()).getTime() - out_this.mDisplayTime;
                    //Timer.instance().delay(showTime);
                    //Timer.instance().start();
                    PIXI.ticker.shared.start();
                }
            }
        })();
        // Set the default show action to put the default text on the screen
        // mShowAction = new LolAction() {
        //     @Override
        //     public void go() {
        //         // If the scene has been disabled, just return
        //         if (mDisable) {
        //             dismiss();
        //             return;
        //         }
        //         // play the show sound
        //         if (mSound != null)
        //             mSound.play(Lol.getGameFact(mConfig, "volume", 1));
        //         // The default text to display can change at the last second, so we compute it here
        //         addTextCentered(mConfig.mWidth / mConfig.mPixelMeterRatio / 2, mConfig.mHeight / mConfig.mPixelMeterRatio / 2,
        //                 mConfig.mDefaultFontFace, mConfig.mDefaultFontColor, mConfig.mDefaultFontSize, "", "", new TextProducer() {
        //                     @Override
        //                     public String makeText() {
        //                         return mText;
        //                     }
        //                 }, 0);
        //     }
        // };
    }
    //
    // /**
    //  * Pause the timer when this screen is shown
    //  */
    // void suspendClock() {
    //     Timer.instance().stop();
    //     mDisplayTime = System.currentTimeMillis();
    // }
    //
    /**
     * Render the QuickScene, or return false if it is not supposed to be shown
     *
     * @param sb    The SpriteBatch used to draw the text and pictures
     * @param delta The time since the last render
     * @return true if the PauseScene was drawn, false otherwise
     */
    render() {
        // if the scene is not visible, do nothing
        // if (!mVisible)
        //     return false;
        //
        // // clear screen and draw images/text via HudCam
        // Gdx.gl.glClearColor(0, 0, 0, 1);
        // Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        // mCamera.update();
        // sb.setProjectionMatrix(mCamera.combined);
        // sb.begin();
        // for (ArrayList<Renderable> a : mRenderables) {
        //     for (Renderable r : a) {
        //         r.render(sb, delta);
        //     }
        // }
        // sb.end();
        // TODO: debug rendering?
        return true;
    }
    //
    // /**
    //  * Handler to run when the screen is tapped while the scene is being displayed
    //  *
    //  * @param screenX The x coordinate on screen where the touch happened
    //  * @param screenY The y coordinate on screen where the touch happened
    //  * @param game    The top-level game object
    //  * @return True if the tap was handled, false otherwise
    //  */
    // boolean onTap(float screenX, float screenY, Lol game) {
    //     // ignore if not visible
    //     if (!mVisible)
    //         return false;
    //
    //     // check for taps to the buttons
    //     mHitActor = null;
    //     mCamera.unproject(mTouchVec.set(screenX, screenY, 0));
    //     mWorld.QueryAABB(mTouchCallback, mTouchVec.x - 0.1f, mTouchVec.y - 0.1f, mTouchVec.x + 0.1f, mTouchVec.y + 0.1f);
    //     if (mHitActor != null && mHitActor.mTapHandler != null) {
    //         dismiss(); // TODO: make this the responsibility of the programmer?
    //         mHitActor.onTap(mTouchVec);
    //         return true;
    //     }
    //
    //     // hide the scene only if it's click-to-clear
    //     if (mClickToClear) {
    //         dismiss();
    //         game.liftAllButtons(mTouchVec.x, mTouchVec.y);
    //     }
    //     return true;
    // }
    //
    // /**
    //  * Set the sound to play when the screen is displayed
    //  *
    //  * @param soundName Name of the sound file to play
    //  */
    // public void setSound(String soundName) {
    //     mSound = mMedia.getSound(soundName);
    // }
    //
    /**
     * Indicate that this scene should not be displayed
     */
    disable() {
        this.mDisable = true;
    }
    //
    // /**
    //  * Indicate that tapping the non-button parts of the scene shouldn't return immediately to the
    //  * game.
    //  */
    // public void suppressClearClick() {
    //     mClickToClear = false;
    // }
    //
    // /**
    //  * The default is for a Scene to show until the user touches it to dismiss it. To have the
    //  * Scene disappear after a fixed time instead, use this.
    //  *
    //  * @param duration The time, in seconds, before the PreScene should disappear.
    //  */
    // public void setExpire(float duration) {
    //     if (duration > 0) {
    //         mClickToClear = false;
    //         // resume timers, or this won't work
    //         Timer.instance().start();
    //         Timer.schedule(new Timer.Task() {
    //             @Override
    //             public void run() {
    //                 dismiss();
    //             }
    //         }, duration);
    //     }
    // }
    /**
     * Set the text that should be drawn, centered, when the Scene is shown
     *
     * @param text The text to display. Use "" to disable
     */
    setDefaultText(text) {
        this.mText = text;
    }
    /**
     * Reset a scene, so we can change what is on it.  Only useful for the scenes we might show more
     * than once (such as the PauseScene)
     */
    reset() {
        this.mDisable = false;
        this.mVisible = false;
        //this.mSound = null;
        this.mDisplayTime = 0;
        this.mClickToClear = true;
        this.mText = "";
        super.reset();
    }
    /**
     * Show the scene
     */
    show() {
        this.mVisible = true;
        if (this.mShowAction != null) {
            this.mShowAction.go();
        }
    }
    /**
     * Stop showing the scene
     */
    dismiss() {
        this.mVisible = false;
        this.mDismissAction.go();
    }
    /**
     * Provide some custom code to run when the scene is dismissed
     *
     * @param dismissAction The code to run
     */
    setDismissAction(dismissAction) {
        this.mDismissAction = dismissAction;
    }
    /**
     * Provide some custom code to run when the scene is dismissed
     *
     * @param showAction The code to run
     */
    setShowAction(showAction) {
        this.mShowAction = showAction;
    }
}
/// <reference path="./HudScene.ts"/>
/// <reference path="./MainScene.ts"/>
/// <reference path="./Enemy.ts"/>
/// <reference path="./Hero.ts"/>
/// <reference path="./Goodie.ts"/>
/// <reference path="./QuickScene.ts"/>
/// <reference path="./Media.ts"/>
/// <reference path="./Lol.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>
/**
* These are the ways you can complete a level: you can reach the destination, you can collect
* enough stuff, or you can reach a certain number of enemies defeated.
* <p>
* Technically, there's also 'survive for x seconds', but that doesn't need special support
*/
var VictoryType;
(function (VictoryType) {
    VictoryType[VictoryType["DESTINATION"] = 0] = "DESTINATION";
    VictoryType[VictoryType["GOODIECOUNT"] = 1] = "GOODIECOUNT";
    VictoryType[VictoryType["ENEMYCOUNT"] = 2] = "ENEMYCOUNT";
})(VictoryType || (VictoryType = {}));
class LolManager {
    /**
    * Construct the LolManager, build the scenes, set up the state machine, and clear the scores.
    *
    * @param config The game-wide configuration
    * @param media  All image and sound assets for the game
    * @param game   A reference to the top-level game object
    */
    constructor(config, media, game) {
        /// Modes of the game, for use by the state machine.  We can be showing the main splash
        /// screen, the help screens, the level chooser, the store, or a playable level
        this.SPLASH = 0;
        this.HELP = 1;
        this.CHOOSER = 2;
        this.STORE = 3;
        this.PLAY = 4;
        /// The level within each mode (e.g., we are in PLAY scene 4, and will return to CHOOSER 2)
        this.mModeStates = new Array(5);
        /// The events placed on the webpage
        this.mFunctions = new Array();
        this.mEventTypes = new Array();
        /// Keys being pressed
        this.mKeysPressed = new Array();
        this.mGame = game;
        this.mConfig = config;
        this.mMedia = media;
        // Set up the API, so that any user code we call is able to reach this object
        this.mLevel = new Level(this.mConfig, this.mMedia, this.mGame);
        // build scenes and facts
        this.createScenes();
        this.mSessionFacts = new Map();
        // set current mode states, and reset the scores
        for (let i = 0; i < 5; ++i)
            this.mModeStates[i] = 1;
        this.resetScores();
        //
        // this.mGoodiesCollected = new Array<number>();
    }
    /**
    * Reset all scores.  This should be called at the beginning of every level.
    */
    resetScores() {
        this.mVictoryGoodieCount = new Array(4);
        this.mHeroesCreated = 0;
        this.mGoodiesCollected = new Array(0, 0, 0, 0);
        this.mEnemiesCreated = 0;
        this.mEnemiesDefeated = 0;
        this.mGameOver = false;
        this.mLoseCountDownRemaining = -100;
        this.mLoseCountDownText = "";
        this.mWinCountRemaining = -100;
        this.mWinCountText = "";
        this.mStopWatchProgress = -100;
        this.mDistance = 0;
        this.mHeroesDefeated = 0;
        this.mDestinationArrivals = 0;
        this.mVictoryType = VictoryType.DESTINATION;
        this.mVictoryHeroCount = 0;
        this.mVictoryEnemyCount = 0;
        this.mEndGameEvent = null;
        this.mWinCallback = null;
        this.mLoseCallback = null;
    }
    /**
    * Create all scenes for a playable level.
    */
    createScenes() {
        // Create the easy scenes
        this.mWorld = new MainScene(this.mConfig, this.mMedia);
        this.mHud = new HudScene(this.mConfig, this.mMedia);
        this.mContainer = new PIXI.Container();
        this.mContainer.addChild(this.mWorld.mCamera.mContainer);
        this.mContainer.addChild(this.mHud.mCamera.mContainer);
    }
    /**
    * Before we call programmer code to load a new scene, we call this to ensure that everything is
    * in a clean state.
    */
    onScreenChange() {
        for (let i = 0; i < this.mFunctions.length; i++) {
            document.removeEventListener(this.mEventTypes[i], this.mFunctions[i]);
        }
        this.mFunctions.length = 0;
        this.mEventTypes.length = 0;
        this.mWorld.pauseMusic();
        this.createScenes();
        // When debug mode is on, print the frames per second
        // if (this.mConfig.mShowDebugBoxes)
        //   this.mLevel.addDisplay(800, 15, mConfig.mDefaultFontFace, mConfig.mDefaultFontColor, 12, "fps: ", "", mLevel.DisplayFPS, 2);
    }
    // /**
    // * If the level that follows this level has not yet been unlocked, unlock it.
    // * <p>
    // * NB: we only track one value for locking/unlocking, so this actually unlocks all levels up to
    // * and including the level after the current level.
    // */
    // private unlockNext(): void {
    //   if (Lol.getGameFact(this.mConfig, "unlocked", 1) <= this.mModeStates[this.PLAY]) {
    //     Lol.putGameFact(this.mConfig, "unlocked", this.mModeStates[this.PLAY] + 1);
    //   }
    // }
    /**
    * Move forward to the next level, if there is one, and otherwise go back to the chooser.
    */
    advanceLevel() {
        // Make sure to stop the music!
        this.mWorld.stopMusic();
        if (this.mModeStates[this.PLAY] == this.mConfig.mNumLevels) {
            this.doChooser(1);
        }
        else {
            this.mModeStates[this.PLAY]++;
            this.doPlay(this.mModeStates[this.PLAY]);
        }
    }
    /**
    * Start a level over again.
    */
    repeatLevel() {
        this.doPlay(this.mModeStates[this.PLAY]);
    }
    /**
    * Load the splash screen
    */
    doSplash() {
        for (let i = 0; i < 5; ++i) {
            this.mModeStates[i] = 1;
        }
        this.mMode = this.SPLASH;
        this.onScreenChange();
        this.mConfig.mSplash.display(1, this.mLevel);
    }
    /**
    * Load the level-chooser screen. If the chooser is disabled, jump straight to level 1.
    *
    * @param index The chooser screen to create
    */
    doChooser(index) {
        // if chooser disabled, then we either called this from splash, or from a game level
        if (!this.mConfig.mEnableChooser) {
            if (this.mMode == this.PLAY) {
                this.doSplash();
            }
            else {
                this.doPlay(this.mModeStates[this.PLAY]);
            }
            return;
        }
        // the chooser is not disabled... save the choice of level, configure it, and show it.
        this.mMode = this.CHOOSER;
        this.mModeStates[this.CHOOSER] = index;
        this.onScreenChange();
        this.mConfig.mChooser.display(index, this.mLevel);
    }
    /**
    * Load a playable level
    *
    * @param index The index of the level to load
    */
    doPlay(index) {
        this.mModeStates[this.PLAY] = index;
        this.mMode = this.PLAY;
        this.onScreenChange();
        this.resetScores();
        this.mConfig.mLevels.display(index, this.mLevel);
    }
    /**
    * Load a help level
    *
    * @param index The index of the help level to load
    */
    doHelp(index) {
        this.mModeStates[this.HELP] = index;
        this.mMode = this.HELP;
        this.onScreenChange();
        this.mConfig.mHelp.display(index, this.mLevel);
    }
    /**
    * Load a lose scene
    *
    * @param index The index of the level that was lost
    */
    doLose(index) {
        this.onScreenChange();
        this.resetScores();
        this.mConfig.mLose.display(index, this.mLevel);
    }
    /**
    * Load a win scene
    *
    * @param index The index of the level that was won
    */
    doWin(index) {
        this.onScreenChange();
        this.resetScores();
        this.mConfig.mWin.display(index, this.mLevel);
    }
    /**
    * Load a screen of the store.
    *
    * @param index The index of the help level to load
    */
    doStore(index) {
        this.mModeStates[this.STORE] = index;
        this.mMode = this.STORE;
        this.onScreenChange();
        this.mConfig.mStore.display(index, this.mLevel);
    }
    // TODO: What does quitting the game look like??
    // With a webpage, closing the browser tab should be sufficient?
    /**
    * Quit the game
    */
    doQuit() {
        this.mWorld.stopMusic();
        //Gdx.app.exit();
    }
    /**
    * Indicate that a hero has been defeated
    *
    * @param enemy The enemy who defeated the hero
    */
    defeatHero(enemy) {
        this.mHeroesDefeated++;
        if (this.mHeroesDefeated == this.mHeroesCreated) {
            // possibly change the end-of-level text
            if (enemy.mOnDefeatHeroText !== "") {
                this.mLoseScene.setDefaultText(enemy.mOnDefeatHeroText);
            }
            this.endLevel(false);
        }
    }
    /**
    * Indicate that a goodie has been collected
    *
    * @param goodie The goodie that was collected
    */
    onGoodieCollected(goodie) {
        // Update goodie counts
        for (let i = 0; i < 4; ++i) {
            this.mGoodiesCollected[i] += goodie.mScore[i];
        }
        // possibly win the level, but only if we win on goodie count and all
        // four counts are high enough
        if (this.mVictoryType != VictoryType.GOODIECOUNT) {
            return;
        }
        let match = true;
        for (let i = 0; i < 4; ++i) {
            match = match && (this.mVictoryGoodieCount[i] <= this.mGoodiesCollected[i]);
        }
        if (match) {
            this.endLevel(true);
        }
    }
    /**
    * Indicate that a hero has reached a destination
    */
    onDestinationArrive() {
        // check if the level is complete
        this.mDestinationArrivals++;
        if ((this.mVictoryType == VictoryType.DESTINATION) && (this.mDestinationArrivals >= this.mVictoryHeroCount)) {
            console.log("Win");
            this.endLevel(true);
        }
    }
    /**
    * Indicate that an enemy has been defeated
    */
    onDefeatEnemy() {
        // update the count of defeated enemies
        this.mEnemiesDefeated++;
        // if we win by defeating enemies, see if we've defeated enough of them:
        let win = false;
        if (this.mVictoryType == VictoryType.ENEMYCOUNT) {
            // -1 means "defeat all enemies"
            if (this.mVictoryEnemyCount == -1) {
                win = this.mEnemiesDefeated == this.mEnemiesCreated;
            }
            else {
                win = this.mEnemiesDefeated >= this.mVictoryEnemyCount;
            }
        }
        if (win) {
            this.endLevel(true);
        }
    }
    /*
     *  Returns number of enemies defeated
     */
    getEnemiesDefeated() {
        return this.mEnemiesDefeated;
    }
    /**
    * When a level ends, we run this code to shut it down, print a message, and
    * then let the user resume play
    *
    * @param win true if the level was won, false otherwise
    */
    endLevel(win) {
        if (win) {
            this.doWin(this.mModeStates[this.PLAY]);
        }
        else {
            this.doLose(this.mModeStates[this.PLAY]);
        }
    }
    /**
    * Update all timer counters associated with the current level
    */
    // TODO: This uses PIXI.ticker, which may require some adjustments
    updateTimeCounts() {
        // Check the countdown timers
        if (this.mLoseCountDownRemaining != -100) {
            this.mLoseCountDownRemaining -= (PIXI.ticker.shared.deltaTime / 100); //Gdx.graphics.getDeltaTime();
            if (this.mLoseCountDownRemaining < 0) {
                this.endLevel(false);
            }
        }
        if (this.mWinCountRemaining != -100) {
            this.mWinCountRemaining -= PIXI.ticker.shared.deltaTime / 100; //Gdx.graphics.getDeltaTime();
            if (this.mWinCountRemaining < 0) {
                this.endLevel(true);
            }
        }
        if (this.mStopWatchProgress != -100) {
            this.mStopWatchProgress += PIXI.ticker.shared.deltaTime / 100; //Gdx.graphics.getDeltaTime();
        }
    }
}
/// <reference path="./LolManager.ts"/>
/// <reference path="./LolScene.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>
class Lol {
    constructor(config) {
        this.mConfig = config;
        this.mRenderer = PIXI.autoDetectRenderer(config.mWidth, config.mHeight);
    }
    /**
     * Instead of using Gdx.app.log directly, and potentially writing a lot of debug info in a
     * production setting, we use this to only dump to the log when debug mode is on
     *
     * @param config The game-wide configuration
     * @param tag    The message tag
     * @param text   The message text
     */
    static message(config, tag, text) {
        if (config.mShowDebugBoxes)
            console.log(tag + " " + text);
    }
    /**
     * App creation lifecycle event.
     * NB: This is an internal method for initializing a game. User code should never call this.
     */
    create() {
        // The config object has already been set, so we can load all assets
        this.mMedia = new Media(this.mConfig);
        // Create the level manager, and instruct it to transition to the Splash screen
        this.mManager = new LolManager(this.mConfig, this.mMedia, this);
        // Make sure all textures are loaded
        PIXI.loader.load(() => this.mManager.doSplash());
    }
    /**
     * This code is called every 1/45th of a second to update the game state and re-draw the screen
     * <p>
     * NB: This is an internal method. User code should never call this.
     */
    render() {
        this.mManager.mWorld.mWorld.Step(1 / 45, 8, 3);
        // Make sure the music is playing... Note that we start music before the PreScene shows
        this.mManager.mWorld.playMusic();
        // Adjust camera if it needs to follow an actor
        this.mManager.mWorld.adjustCamera();
        this.mManager.mWorld.render();
        this.mManager.mHud.render();
        this.mRenderer.render(this.mManager.mContainer);
        this.mManager.mWorld.mOneTimeEvents.forEach((pe) => {
            if (pe.mIsActive)
                pe.go();
        });
        this.mManager.mWorld.mOneTimeEvents.length = 0;
        this.mManager.mWorld.mRepeatEvents.forEach((pe) => {
            if (pe.mIsActive)
                pe.go();
        });
        // Update the win/lose timers
        this.mManager.updateTimeCounts();
    }
}
/// <reference path="./WorldActor.ts"/>
/// <reference path="./CollisionCallback.ts"/>
/// <reference path="./Lol.ts"/>
/// <reference path="./Level.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>
/**
 * Obstacles are usually walls, except they can move, and can be used to run all sorts of arbitrary
 * code that changes the game, or the behavior of the things that collide with them. It's best to
 * think of them as being both "a wall" and "a catch-all for any behavior that we don't have
 * anywhere else".
 */
class Obstacle extends WorldActor {
    /**
     * Build an obstacle, but do not give it any Physics body yet
     *
     * @param width   width of this Obstacle
     * @param height  height of this Obstacle
     * @param imgName Name of the image file to use
     */
    constructor(game, level, width, height, imgName) {
        super(game, level, imgName, width, height);
    }
    /**
     * Internal method for playing a sound when a hero collides with this obstacle
     */
    playCollideSound() {
        if (this.mCollideSound == null)
            return;
        // Make sure we have waited long enough since the last time we played the sound
        let now = (new Date()).getTime();
        if (now < this.mLastCollideSoundTime + this.mCollideSoundDelay)
            return;
        this.mLastCollideSoundTime = now;
        this.mCollideSound.play();
    }
    /**
     * Code to run when an Obstacle collides with a WorldActor.
     *
     * The Obstacle always comes last in the collision hierarchy, so no code is needed here
     *
     * @param other   Other object involved in this collision
     * @param contact A description of the contact that caused this collision
     */
    //@Override
    onCollide(other, contact) {
    }
    /**
     * Make the Obstacle into a pad that changes the hero's speed when the hero glides over it.
     * <p>
     * These "pads" will multiply the hero's speed by the factor given as a parameter. Factors can
     * be negative to cause a reverse direction, less than 1 to cause a slowdown (friction pads), or
     * greater than 1 to serve as zoom pads.
     *
     * @param factor Value to multiply the hero's velocity when it collides with this Obstacle
     */
    setPad(factor) {
        // disable collisions on this obstacle
        this.setCollisionsEnabled(false);
        // register a callback to multiply the hero's speed by factor
        this.mHeroCollision = new (class _ {
            //@Override
            go(self, h, c) {
                let v = h.mBody.GetLinearVelocity();
                v.Multiply(factor);
                h.updateVelocity(v.x, v.y);
            }
        })();
    }
    /**
     * Call this on an obstacle to make it behave like a "pad" obstacle, except with a constant
     * additive (or subtractive) effect on the hero's speed.
     *
     * @param boostAmountX  The amount to add to the hero's X velocity
     * @param boostAmountY  The amount to add to the hero's Y velocity
     * @param boostDuration How long should the speed boost last (use -1 to indicate "forever")
     */
    setSpeedBoost(boostAmountX, boostAmountY, boostDuration) {
        // disable collisions on this obstacle
        this.setCollisionsEnabled(false);
        // register a callback to change the hero's speed
        this.mHeroCollision = new (class _ {
            //@Override
            go(self, h, c) {
                // boost the speed
                let v = h.mBody.GetLinearVelocity();
                v.x += boostAmountX;
                v.y += boostAmountY;
                h.updateVelocity(v.x, v.y);
                // now set a timer to un-boost the speed
                if (boostDuration > 0) {
                    // set up a timer to shut off the boost
                    setTimeout(() => {
                        let v = h.mBody.GetLinearVelocity();
                        v.x -= boostAmountX;
                        v.y -= boostAmountY;
                        h.updateVelocity(v.x, v.y);
                    }, boostDuration);
                }
            }
        })();
    }
    /**
     * Control whether the hero can jump if it collides with this obstacle while in the air
     *
     * @param enable true if the hero can jump again, false otherwise
     */
    setReJump(enable) {
        this.mNoJumpReenable = !enable;
    }
    /**
     * Make the object a callback object, so that custom code will run when a hero collides with it
     *
     * @param activationGoodies1 Number of type-1 goodies needed before this callback works
     * @param activationGoodies2 Number of type-2 goodies needed before this callback works
     * @param activationGoodies3 Number of type-3 goodies needed before this callback works
     * @param activationGoodies4 Number of type-4 goodies needed before this callback works
     * @param delay              The time between when the collision happens, and when the callback
     *                           code runs. Use 0 for immediately
     * @param callback           The code to run when the collision happens
     */
    setHeroCollisionCallback(activationGoodies1, activationGoodies2, activationGoodies3, activationGoodies4, delay, callback) {
        // save the required goodie counts, turn off collisions
        const counts = [activationGoodies1, activationGoodies2, activationGoodies3, activationGoodies4];
        this.setCollisionsEnabled(false);
        let outer_this = this;
        // register a callback
        this.mHeroCollision = new (class _ {
            //@Override
            go(self, ps, c) {
                // Make sure the contact is active (it's not if this is a pass-through event)
                if (c.IsEnabled()) {
                    // check if callback is activated, if so run Callback code
                    let match = true;
                    for (let i = 0; i < 4; ++i)
                        match = match && (counts[i] <= outer_this.mGame.mManager.mGoodiesCollected[i]);
                    if (match) {
                        // run now, or delay?
                        if (delay <= 0) {
                            callback.go(self, ps, c);
                        }
                        else {
                            setTimeout(() => {
                                callback.go(self, ps, c);
                            }, delay);
                        }
                    }
                }
            }
        })();
    }
    /**
     * Make the object a callback object, so custom code will run when an enemy collides with it
     *
     * @param delay    The time between when the collision happens, and when the callback code runs.
     *                 Use 0 for immediately
     * @param callback The code to run when an enemy collides with this obstacle
     */
    setEnemyCollisionCallback(delay, callback) {
        this.mEnemyCollision = new (class _ {
            //@Override
            go(self, ps, c) {
                // run the callback after a delay, or immediately?
                if (delay <= 0) {
                    callback.go(self, ps, c);
                }
                else {
                    setTimeout(() => {
                        callback.go(self, ps, c);
                    }, delay);
                }
            }
        })();
    }
    /**
     * Make the object a callback object, so custom code will run when a projectile collides with it
     *
     * @param callback The code to run on a collision
     */
    setProjectileCollisionCallback(callback) {
        this.mProjectileCollision = callback;
    }
    /**
     * Indicate that when the hero collides with this obstacle, we should make a sound
     *
     * @param sound The name of the sound file to play
     * @param delay How long to wait before playing the sound again, in milliseconds
     */
    setCollideSound(sound, delay) {
        this.mCollideSound = this.mScene.mMedia.getSound(sound);
        this.mCollideSoundDelay = delay * 1000000;
    }
}
/// <reference path="./WorldActor.ts"/>
/// <reference path="./Obstacle.ts"/>
/// <reference path="./Destination.ts"/>
/// <reference path="./LolActorEvent.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>
/**
* The Hero is the focal point of a game. While it is technically possible to have many heroes, or
* invisible heroes that exist just so that the player has to keep bad things from happening to the
* hero, it is usually the case that a game has one hero who moves around on the screen, possibly
* jumping and crawling.
*/
class Hero extends WorldActor {
    /**
    * Construct a Hero, but don't give it any physics yet
    *
    * @param game    The currently active game
    * @param scene   The scene into which the Hero is being placed
    * @param width   The width of the hero
    * @param height  The height of the hero
    * @param imgName The name of the file that has the default image for this hero
    */
    constructor(game, scene, width, height, imgName) {
        super(game, scene, imgName, width, height);
        this.mStrength = 1;
        this.mJumpImpulses = new PhysicsType2d.Vector2(0, 0);
    }
    /**
    * Code to run when rendering the Hero.
    *
    * NB:  We can't just use the basic renderer, because we might need to adjust a one-off
    *      animation (invincibility or throw) first
    *
    * @param sb    The SpriteBatch to use for drawing this hero
    * @param delta The time since the last render
    */
    //@Override
    onRender() {
        // determine when to turn off throw animations
        // if (mThrowAnimationTimeRemaining > 0) {
        //   mThrowAnimationTimeRemaining -= delta;
        //   if (mThrowAnimationTimeRemaining <= 0) {
        //     mThrowAnimationTimeRemaining = 0;
        //     mAnimator.setCurrentAnimation(mDefaultAnimation);
        //   }
        // }
        //
        // // determine when to turn off invincibility and cease invincibility animation
        // if (mInvincibleRemaining > 0) {
        //   mInvincibleRemaining -= delta;
        //   if (mInvincibleRemaining <= 0) {
        //     mInvincibleRemaining = 0;
        //     if (mInvincibleAnimation != null)
        //     mAnimator.setCurrentAnimation(mDefaultAnimation);
        //   }
        // }
        super.onRender();
    }
    /**
    * Make the hero jump, unless it is in the air and not multi-jump
    */
    jump() {
        // NB: multi-jump prevents us from ever setting mInAir, so this is safe:
        if (this.mInAir) {
            return;
        }
        let v = this.mBody.GetLinearVelocity();
        v.x = v.x + this.mJumpImpulses.x;
        v.y = v.y + this.mJumpImpulses.y;
        this.updateVelocity(v.x, v.y);
        if (!this.mAllowMultiJump) {
            this.mInAir = true;
        }
        // if (this.mJumpAnimation != null)
        //     this.mAnimator.setCurrentAnimation(this.mJumpAnimation);
        if (this.mJumpSound != null) {
            this.mJumpSound.play();
        }
        // suspend creation of sticky joints, so the hero can actually move
        // this.mStickyDelay = System.currentTimeMillis() + 10;
    }
    /**
    * Stop the jump animation for a hero, and make it eligible to jump again
    */
    stopJump() {
        if (this.mInAir || this.mAllowMultiJump) {
            this.mInAir = false;
            // this.mAnimator.setCurrentAnimation(this.mDefaultAnimation);
        }
    }
    // /**
    // * Make the hero's throw animation play while it is throwing a projectile
    // */
    // void doThrowAnimation() {
    //   if (mThrowAnimation != null) {
    //     mAnimator.setCurrentAnimation(mThrowAnimation);
    //     mThrowAnimationTimeRemaining = mThrowAnimateTotalLength;
    //   }
    // }
    /**
    * Put the hero in crawl mode. Note that we make the hero rotate when it is crawling
    */
    crawlOn() {
        if (this.mCrawling) {
            return;
        }
        this.mCrawling = true;
        this.mBody.SetTransform(this.mBody.GetPosition(), -3.14159 / 2);
        // if (this.mCrawlAnimation != null)
        //   this.mAnimator.setCurrentAnimation(this.mCrawlAnimation);
    }
    /**
    * Take the hero out of crawl mode
    */
    crawlOff() {
        if (!this.mCrawling) {
            return;
        }
        this.mCrawling = false;
        this.mBody.SetTransform(this.mBody.GetPosition(), 0);
        // this.mAnimator.setCurrentAnimation(this.mDefaultAnimation);
    }
    /**
    * Change the rotation of the hero
    *
    * @param delta How much to add to the current rotation
    */
    increaseRotation(delta) {
        if (this.mInAir) {
            this.mCurrentRotation += delta;
            this.mBody.SetAngularVelocity(0);
            this.mBody.SetTransform(this.mBody.GetPosition(), this.mCurrentRotation);
        }
    }
    /**
    * Code to run when a Hero collides with a WorldActor.
    *
    * The Hero is the dominant participant in all collisions. Whenever the hero collides with
    * something, we need to figure out what to do
    *
    * @param other   Other object involved in this collision
    * @param contact A description of the contact that caused this collision
    */
    //@Override
    onCollide(other, contact) {
        // NB: we currently ignore Projectile and Hero
        if (other instanceof Enemy) {
            this.onCollideWithEnemy(other);
        }
        else if (other instanceof Destination) {
            this.onCollideWithDestination(other);
        }
        else if (other instanceof Obstacle) {
            this.onCollideWithObstacle(other, contact);
        }
        else if (other instanceof Goodie) {
            this.onCollideWithGoodie(other);
        }
        if (other instanceof Goodie) {
            this.mGame.mManager.onGoodieCollected(other);
        }
    }
    /**
    * Dispatch method for handling Hero collisions with Destinations
    *
    * @param destination The destination with which this hero collided
    */
    onCollideWithDestination(destination) {
        // The hero must have enough goodies, and the destination must have room
        let match = true;
        for (let i = 0; i < 4; ++i) {
            match = match && (this.mGame.mManager.mGoodiesCollected[i] >= destination.mActivation[i]);
        }
        if (match && (destination.mHolding < destination.mCapacity) && this.mEnabled) {
            // hide the hero quietly, since the destination might make a sound
            this.remove(true);
            destination.mHolding++;
            if (destination.mArrivalSound != null) {
                destination.mArrivalSound.play();
            }
            this.mGame.mManager.onDestinationArrive();
        }
    }
    /**
    * Dispatch method for handling Hero collisions with Enemies
    *
    * @param enemy The enemy with which this hero collided
    */
    onCollideWithEnemy(enemy) {
        // if the enemy always defeats the hero, no matter what, then defeat the hero
        if (enemy.mAlwaysDoesDamage) {
            this.remove(false);
            this.mGame.mManager.defeatHero(enemy);
            if (this.mMustSurvive) {
                this.mGame.mManager.endLevel(false);
            }
            return;
        }
        // handle hero invincibility
        if (this.mInvincibleRemaining > 0) {
            // if the enemy is immune to invincibility, do nothing
            if (enemy.mImmuneToInvincibility) {
                return;
            }
            enemy.defeat(true);
        }
        else if (this.mCrawling && enemy.mDefeatByCrawl) {
            enemy.defeat(true);
        }
        else if (this.mInAir && enemy.mDefeatByJump && this.getYPosition() > enemy.getYPosition() + enemy.mSize.y / 2) {
            enemy.defeat(true);
        }
        else if (enemy.mDamage >= this.mStrength) {
            this.remove(false);
            this.mGame.mManager.defeatHero(enemy);
            if (this.mMustSurvive) {
                this.mGame.mManager.endLevel(false);
            }
        }
        else {
            this.addStrength(-enemy.mDamage);
            enemy.defeat(true);
        }
    }
    /**
    * Update the hero's strength, and then run the strength change callback (if any)
    *
    * @param amount The amount to add (use a negative value to subtract)
    */
    addStrength(amount) {
        this.mStrength += amount;
        if (this.mStrengthChangeCallback != null) {
            this.mStrengthChangeCallback.go(this);
        }
    }
    /**
    * Dispatch method for handling Hero collisions with Obstacles
    *
    * @param o The obstacle with which this hero collided
    */
    onCollideWithObstacle(o, contact) {
        // do we need to play a sound?
        o.playCollideSound();
        let fixtures = o.mBody.GetFixtures();
        fixtures.MoveNext();
        let f = fixtures.Current();
        // reset rotation of hero if this obstacle is not a sensor
        // if ((this.mCurrentRotation != 0) && !f.IsSensor()) {
        //   this.increaseRotation(-this.mCurrentRotation);
        // }
        // if there is code attached to the obstacle for modifying the hero's behavior, run it
        if (o.mHeroCollision != null) {
            o.mHeroCollision.go(o, this, contact);
        }
        // If this is a wall, then mark us not in the air so we can do more jumps. Note that sensors
        // should not enable jumps for the hero.
        if ((this.mInAir || this.mAllowMultiJump) && !f.IsSensor() &&
            !o.mNoJumpReenable) {
            this.stopJump();
        }
    }
    /**
    * Dispatch method for handling Hero collisions with Goodies
    *
    * @param g The goodie with which this hero collided
    */
    onCollideWithGoodie(g) {
        // hide the goodie, count it, and update strength
        g.remove(false);
        this.mGame.mManager.onGoodieCollected(g);
        this.addStrength(g.mStrengthBoost);
        // deal with invincibility by updating invincible time and running an animation
        if (g.mInvincibilityDuration > 0) {
            this.mInvincibleRemaining += g.mInvincibilityDuration;
            // if (this.mInvincibleAnimation != null)
            //  this.mAnimator.setCurrentAnimation(this.mInvincibleAnimation);
        }
    }
    /**
    * Return the hero's strength
    *
    * @return The strength of the hero
    */
    getStrength() {
        return this.mStrength;
    }
    /**
    * Change the hero's strength.
    *
    * NB: calling this will not run any strength change callbacks... they only run in conjunction
    *     with collisions with goodies or enemies.
    *
    * @param amount The new strength of the hero
    */
    setStrength(amount) {
        this.mStrength = amount;
    }
    /**
     * Indicate that upon a touch, this hero should begin moving with a specific velocity
     *
     * @param x Velocity in X dimension
     * @param y Velocity in Y dimension
     */
    setTouchAndGo(x, y) {
        let out_this = this;
        this.mTapHandler = new (class _ extends TouchEventHandler {
            go(worldX, worldY) {
                out_this.mHover = null;
                // if it was hovering, its body type won't be Dynamic
                if (out_this.mBody.GetType() != PhysicsType2d.Dynamics.BodyType.DYNAMIC)
                    out_this.mBody.SetType(PhysicsType2d.Dynamics.BodyType.DYNAMIC);
                out_this.setAbsoluteVelocity(x, y);
                // turn off isTouchAndGo, so we can't double-touch
                out_this.mTapHandler = null;
                return true;
            }
        })();
    }
    /**
     * Specify the X and Y velocity to give to the hero whenever it is instructed to jump
     *
     * @param x Velocity in X direction
     * @param y Velocity in Y direction
     */
    setJumpImpulses(x, y) {
        this.mJumpImpulses = new PhysicsType2d.Vector2(x, -y);
    }
    /**
     * Indicate that this hero can jump while it is in the air
     */
    setMultiJumpOn() {
        this.mAllowMultiJump = true;
    }
    /**
    * Indicate that touching this hero should make it jump
    */
    setTouchToJump() {
        let out_this = this;
        this.mTapHandler = new (class _ extends TouchEventHandler {
            go(worldX, worldY) {
                out_this.jump();
                return true;
            }
        })();
    }
    // /**
    //  * Register an animation sequence for when the hero is jumping
    //  *
    //  * @param animation The animation to display
    //  */
    // public setJumpAnimation(Animation animation): void {
    //     mJumpAnimation = animation;
    // }
    /**
     * Set the sound to play when a jump occurs
     *
     * @param soundName The name of the sound file to use
     */
    setJumpSound(soundName) {
        this.mJumpSound = this.mScene.mMedia.getSound(soundName);
    }
    // /**
    //  * Register an animation sequence for when the hero is throwing a projectile
    //  *
    //  * @param animation The animation to display
    //  */
    // public void setThrowAnimation(Animation animation) {
    //     mThrowAnimation = animation;
    //     // compute the length of the throw sequence, so that we can get our
    //     // timer right for restoring the default animation
    //     mThrowAnimateTotalLength = animation.getDuration() / 1000;
    // }
    // /**
    //  * Register an animation sequence for when the hero is crawling
    //  *
    //  * @param animation The animation to display
    //  */
    // public void setCrawlAnimation(Animation animation) {
    //     mCrawlAnimation = animation;
    // }
    // /**
    //  * Register an animation sequence for when the hero is invincible
    //  *
    //  * @param a The animation to display
    //  */
    // public void setInvincibleAnimation(Animation a) {
    //     mInvincibleAnimation = a;
    // }
    /**
     * Indicate that the level should end immediately if this hero is defeated
     */
    setMustSurvive() {
        this.mMustSurvive = true;
    }
    /**
     * Provide code to run when the hero's strength changes
     *
     * @param callback The code to run.
     */
    setStrengthChangeCallback(callback) {
        this.mStrengthChangeCallback = callback;
    }
}
/// <reference path="./WorldActor.ts"/>
/// <reference path="./MainScene.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
//// <reference types="pixi.js"/>
/**
 * Projectiles are actors that can be thrown from the hero's location in order to remove enemies.
 */
class Projectile extends WorldActor {
    /**
     * Create a projectile, and give it a physics body
     *
     * @param width    width of the projectile
     * @param height   height of the projectile
     * @param imgName  Name of the image file to use for this projectile
     * @param x        initial x position of the projectile
     * @param y        initial y position of the projectile
     * @param zIndex   The z plane of the projectile
     * @param isCircle True if it is a circle, false if it is a box
     */
    constructor(game, level, width, height, imgName, x, y, zIndex, isCircle) {
        super(game, level, imgName, width, height);
        if (isCircle) {
            let radius = Math.max(width, height);
            this.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, x, y, radius / 2);
        }
        else {
            this.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, x, y);
        }
        this.setFastMoving(true);
        this.mBody.SetGravityScale(0);
        this.setCollisionsEnabled(false);
        this.disableRotation();
        this.mScene.addActor(this, zIndex);
        this.mDisappearOnCollide = true;
        //NB: in physicstype2d, Vector2 constructor must take two arguments
        this.mRangeFrom = new PhysicsType2d.Vector2(0, 0);
        this.mRange = 1000;
    }
    /**
     * Code to run when a Projectile collides with a WorldActor.
     *
     * The only collision where Projectile is dominant is a collision with an Obstacle or another
     * Projectile.  On most collisions, a projectile will disappear.
     *
     * @param other   Other object involved in this collision
     * @param contact A description of the contact that caused this collision
     */
    //@Override
    onCollide(other, contact) {
        // if this is an obstacle, check if it is a projectile callback, and if so, do the callback
        if (other instanceof Obstacle) {
            let o = other;
            if (o.mProjectileCollision) {
                o.mProjectileCollision.go(o, this, contact);
                // return... don't remove the projectile
                return;
            }
        }
        if (other instanceof Projectile) {
            if (!this.mDisappearOnCollide)
                return;
        }
        // only disappear if other is not a sensor
        let f = other.mBody.GetFixtures();
        f.MoveNext();
        if (f.Current().IsSensor()) {
            f.Reset();
            return;
        }
        this.remove(false);
    }
    /**
     * When drawing a projectile, we first check if it is too far from its starting point. We only
     * draw it if it is not.
     *
     * @param sb    The SpriteBatch to use for drawing this hero
     * @param delta The time since the last render
     */
    //@Override
    onRender() {
        // eliminate the projectile quietly if it has traveled too far
        let dx = Math.abs(this.mBody.GetPosition().x - this.mRangeFrom.x);
        let dy = Math.abs(this.mBody.GetPosition().y - this.mRangeFrom.y);
        if (dx * dx + dy * dy > this.mRange * this.mRange) {
            this.remove(true);
            return;
        }
        super.onRender();
    }
}
/**
 * ProjectilePool stores a set of projectiles.  We can get into lots of trouble with Box2d if we
 * make too many actors, so the projectile pool is a useful mechanism for re-using projectiles after
 * they become defunct.
 */
class ProjectilePool {
    /**
     * Create a pool of projectiles, and set the way they are thrown.
     *
     * @param game    The currently active game
     * @param size     number of projectiles that can be thrown at once
     * @param width    width of a projectile
     * @param height   height of a projectile
     * @param imgName  image to use for projectiles
     * @param strength specifies the amount of damage that a projectile does to an
     *                 enemy
     * @param zIndex   The z plane on which the projectiles should be drawn
     * @param isCircle Should projectiles have an underlying circle or box shape?
     */
    constructor(game, level, size, width, height, imgName, strength, zIndex, isCircle) {
        this.mLevel = level;
        // set up the pool
        this.mPool = new Array(size);
        // don't draw all projectiles in same place...
        for (let i = 0; i < size; ++i) {
            this.mPool[i] = new Projectile(game, level, width, height, imgName, -100 - i * width, -100 - i * height, zIndex, isCircle);
            this.mPool[i].mEnabled = false;
            this.mPool[i].mSprite.visible = false;
            this.mPool[i].mBody.SetBullet(true);
            this.mPool[i].mBody.SetActive(false);
            this.mPool[i].mDamage = strength;
        }
        this.mNextIndex = 0;
        this.mPoolSize = size;
        // record vars that describe how the projectile behaves
        this.mThrowSound = null;
        this.mProjectileDisappearSound = null;
        this.mProjectilesRemaining = -1;
        this.mSensorProjectiles = true;
    }
    /**
     * Throw a projectile. This is for throwing in a single, predetermined direction
     *
     * @param h         The hero who is performing the throw
     * @param offsetX   specifies the x distance between the top left of the
     *                  projectile and the top left of the hero throwing the
     *                  projectile
     * @param offsetY   specifies the y distance between the top left of the
     *                  projectile and the top left of the hero throwing the
     *                  projectile
     * @param velocityX The X velocity of the projectile when it is thrown
     * @param velocityY The Y velocity of the projectile when it is thrown
     */
    throwFixed(h, offsetX, offsetY, velocityX, velocityY) {
        // have we reached our limit?
        if (this.mProjectilesRemaining == 0)
            return;
        // do we need to decrease our limit?
        if (this.mProjectilesRemaining != -1)
            this.mProjectilesRemaining--;
        // is there an available projectile?
        if (this.mPool[this.mNextIndex].mEnabled)
            return;
        // get the next projectile, reset sensor, set image
        let b = this.mPool[this.mNextIndex];
        this.mNextIndex = (this.mNextIndex + 1) % this.mPoolSize;
        b.setCollisionsEnabled(!this.mSensorProjectiles);
        // if (this.mRandomizeImages)
        //     b.mAnimator.updateIndex(this.mLevel.mGenerator);
        // calculate offset for starting position of projectile, put it on screen
        b.mRangeFrom.x = h.getXPosition() + offsetX;
        b.mRangeFrom.y = h.getYPosition() + offsetY;
        b.mBody.SetActive(true);
        b.mSprite.visible = true;
        b.mBody.SetTransform(b.mRangeFrom, 0);
        // give the projectile velocity, show it, play sound, animate the hero
        b.updateVelocity(velocityX, velocityY);
        b.mEnabled = true;
        if (this.mThrowSound)
            this.mThrowSound.play();
        b.mDisappearSound = this.mProjectileDisappearSound;
        //h.doThrowAnimation();
    }
    /**
     * Throw a projectile. This is for throwing in the direction of a specified point
     *
     * @param heroX   x coordinate of the top left corner of the thrower
     * @param heroY   y coordinate of the top left corner of the thrower
     * @param toX     x coordinate of the point at which to throw
     * @param toY     y coordinate of the point at which to throw
     * @param h       The hero who is performing the throw
     * @param offsetX specifies the x distance between the bottom left of the
     *                projectile and the bottom left of the hero throwing the
     *                projectile
     * @param offsetY specifies the y distance between the bottom left of the
     *                projectile and the bottom left of the hero throwing the
     *                projectile
     */
    throwAt(heroX, heroY, toX, toY, h, offsetX, offsetY) {
        // have we reached our limit?
        if (this.mProjectilesRemaining == 0)
            return;
        // do we need to decrease our limit?
        if (this.mProjectilesRemaining != -1)
            this.mProjectilesRemaining--;
        // is there an available projectile?
        if (this.mPool[this.mNextIndex].mEnabled)
            return;
        // get the next projectile, set sensor, set image
        let b = this.mPool[this.mNextIndex];
        this.mNextIndex = (this.mNextIndex + 1) % this.mPoolSize;
        b.setCollisionsEnabled(!this.mSensorProjectiles);
        // if (this.mRandomizeImages)
        //     b.mAnimator.updateIndex(this.mLevel.mGenerator);
        // calculate offset for starting position of projectile, put it on screen
        b.mRangeFrom.x = heroX + offsetX;
        b.mRangeFrom.y = heroY + offsetY;
        b.mBody.SetActive(true);
        b.mSprite.visible = true;
        b.mBody.SetTransform(b.mRangeFrom, 0);
        // give the projectile velocity
        if (this.mEnableFixedVectorVelocity) {
            // compute a unit vector
            let dX = toX - heroX - offsetX;
            let dY = toY - heroY - offsetY;
            let hypotenuse = Math.sqrt(dX * dX + dY * dY);
            let tmpX = dX / hypotenuse;
            let tmpY = dY / hypotenuse;
            // multiply by fixed velocity
            tmpX *= this.mFixedVectorVelocity;
            tmpY *= this.mFixedVectorVelocity;
            b.updateVelocity(tmpX, tmpY);
        }
        else {
            let dX = toX - heroX - offsetX;
            let dY = toY - heroY - offsetY;
            // compute absolute vector, multiply by dampening factor
            let tmpX = dX * this.mDirectionalDamp;
            let tmpY = dY * this.mDirectionalDamp;
            b.updateVelocity(tmpX, tmpY);
        }
        // rotate the projectile
        if (this.mRotateVectorThrow) {
            let angle = Math.atan2(toY - heroY - offsetY, toX - heroX - offsetX) - Math.atan2(-1, 0);
            b.mBody.SetTransform(b.mBody.GetPosition(), angle);
        }
        // show the projectile, play sound, and animate the hero
        b.mEnabled = true;
        if (this.mThrowSound)
            this.mThrowSound.play();
        b.mDisappearSound = this.mProjectileDisappearSound;
        //h.doThrowAnimation();
    }
}
/// <reference path="./BaseActor.ts"/>
//// <reference path="./typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
/**
* A Route specifies a set of points that an actor will move between at a fixed speed.
*/
class Route {
    /**
    * Define a new path by specifying the number of points in the path.  The points in the path
    * will be uninitialized until the "to" method is called on this Route.
    *
    * @param numberOfPoints number of points in the path.  There should be at least two points
    */
    constructor(numberOfPoints) {
        this.mPoints = 0;
        this.mXIndices = new Array();
        this.mYIndices = new Array();
    }
    /**
    * Add a new point to a path by giving (coordinates for where the center of the actor goes next
    *
    * @param x X value of the new coordinate
    * @param y Y value of the new coordinate
    */
    to(x, y) {
        this.mXIndices[this.mPoints] = x;
        this.mYIndices[this.mPoints] = y;
        this.mPoints++;
        return this;
    }
}
(function (Route) {
    /**
    * Driver is an internal class, used by LOL to determine placement for a WorldActor whose motion
    * is controlled by a Route.
    */
    class Driver {
        /**
        * Constructing a route driver also starts the route
        *
        * @param route    The route to apply
        * @param velocity The speed at which the actor moves
        * @param loop     Should the route repeat when it completes?
        * @param actor    The actor to which the route should be applied
        */
        constructor(route, velocity, loop, actor) {
            this.mRoute = route;
            this.mRouteVelocity = velocity;
            this.mRouteLoop = loop;
            this.mActor = actor;
            this.mRouteVec = new PhysicsType2d.Vector2(0, 0);
            // kick off the route, indicate that we aren't all done yet
            this.startRoute();
            this.mRouteDone = false;
        }
        /**
        * Stop a route, and stop the actor too
        */
        haltRoute() {
            this.mRouteDone = true;
            this.mActor.setAbsoluteVelocity(0, 0);
        }
        /**
        * Begin running a route
        */
        startRoute() {
            // move to the starting point
            this.mActor.mBody.SetTransform(new PhysicsType2d.Vector2(this.mRoute.mXIndices[0] + this.mActor.mSize.x / 2, this.mRoute.mYIndices[0] + this.mActor.mSize.y / 2), 0);
            // set up our next goal, start moving toward it
            this.mNextRouteGoal = 1;
            this.mRouteVec.x = this.mRoute.mXIndices[this.mNextRouteGoal] - this.mActor.getXPosition();
            this.mRouteVec.y = this.mRoute.mYIndices[this.mNextRouteGoal] - this.mActor.getYPosition();
            // normalize and scale the vector, then apply the velocity
            this.mRouteVec.Normalize();
            this.mRouteVec = this.mRouteVec.Multiply(this.mRouteVelocity);
            this.mActor.mBody.SetLinearVelocity(this.mRouteVec);
        }
        /**
        * Figure out where we need to go next when driving a route
        */
        drive() {
            // quit if we're done and we don't loop
            if (this.mRouteDone) {
                return;
            }
            // if we haven't passed the goal, keep going. we tell if we've passed the goal by
            // comparing the magnitudes of the vectors from source (s) to here and from goal (g) to
            // here
            let sx = this.mRoute.mXIndices[this.mNextRouteGoal - 1] - this.mActor.getXPosition();
            let sy = this.mRoute.mYIndices[this.mNextRouteGoal - 1] - this.mActor.getYPosition();
            let gx = this.mRoute.mXIndices[this.mNextRouteGoal] - this.mActor.getXPosition();
            let gy = this.mRoute.mYIndices[this.mNextRouteGoal] - this.mActor.getYPosition();
            let sameXSign = (gx >= 0 && sx >= 0) || (gx <= 0 && sx <= 0);
            let sameYSign = (gy >= 0 && sy >= 0) || (gy <= 0 && sy <= 0);
            if (((gx == gy) && (gx == 0)) || (sameXSign && sameYSign)) {
                this.mNextRouteGoal++;
                if (this.mNextRouteGoal == this.mRoute.mPoints) {
                    // reset if it's a loop, else terminate Route
                    if (this.mRouteLoop) {
                        this.startRoute();
                    }
                    else {
                        this.mRouteDone = true;
                        this.mActor.mBody.SetLinearVelocity(new PhysicsType2d.Vector2(0, 0));
                    }
                }
                else {
                    // advance to next point
                    this.mRouteVec.x = this.mRoute.mXIndices[this.mNextRouteGoal] - this.mActor.getXPosition();
                    this.mRouteVec.y = this.mRoute.mYIndices[this.mNextRouteGoal] - this.mActor.getYPosition();
                    this.mRouteVec.Normalize();
                    this.mRouteVec = this.mRouteVec.Multiply(this.mRouteVelocity);
                    this.mActor.mBody.SetLinearVelocity(this.mRouteVec);
                }
            }
            // NB: 'else keep going at current velocity'
        }
    }
    Route.Driver = Driver;
})(Route || (Route = {}));
/*
 *  Wrapper class for HTML5 Audio
 */
class Sound {
    constructor(srcFile) {
        this.mSound = document.createElement("audio");
        this.mSound.src = srcFile;
        this.mSound.preload = "auto";
        this.mSound.controls = false;
        this.mSound.style.display = "none";
        this.mSound.autoplay = false;
        this.mSound.loop = false;
        this.mSound.muted = false;
        document.body.appendChild(this.mSound);
    }
    /*
     *  Play the sound with no loop
     */
    play() {
        this.mSound.play();
    }
    /*
     *  Stop/pause the sound
     */
    stop() {
        this.mSound.pause();
    }
    /*
     *  Set if the sound will loop when played
     *  @param loop True to loop, false to turn off looping
     */
    setLooping(loop) {
        this.mSound.loop = loop;
    }
    /*
     *  Mute or unmute sound
     *  @param mute True to mute, false to unmute
     */
    mute(mute) {
        this.mSound.muted = mute;
    }
}
/**
 * ToggleEventHandler is a wrapper for code that ought to run in response to a toggle event.
 */
class ToggleEventHandler {
    constructor() {
        /// A flag to control whether the event is allowed to execute or not
        this.mIsActive = true;
        /// The actor who generated this touch event
        this.mSource = null;
        /// A flag to track if we are in a 'hold' state
        this.isHolding = false;
    }
}
/// <reference path="../library/ScreenManager.ts"/>
/**
* Chooser draws the level chooser screens. Our chooser code is pretty
* straightforward. However, the different screens are drawn in different ways,
* to show how we can write more effective code once we are comfortable with
* loops and basic geometry.
*/
class Chooser {
    /**
    * Describe how to draw each level of the chooser. Our chooser will have 15
    * levels per screen, so we need 7 screens.
    */
    display(index, level) {
        // screen 1: show 1-->15
        //
        // NB: in this screen, we assume you haven't done much programming, so
        // we draw each button with its own line of code, and we don't use any
        // variables.
        if (index == 1) {
            // Put in some catchy background muzak
            level.setMusic("./GameAssets/TitleTheme.mp3");
            // Add a background
            level.drawPicture(0, 0, 960, 540, "./GameAssets/TitleBack.png", -2);
            // Set variables for easy placement of objects
            let midX = 960 / 2;
            let midY = 540 / 2;
            // Back to splash button
            // This adds text for the button
            level.addStaticTextCentered(midX, midY + 100, "Arial", 0x0000FF, 24, "Menu", 1);
            // This makes the button functional
            level.addTapControl(midX - 50, midY + 75, 100, 50, "", new (class _ extends LolAction {
                go() {
                    level.doSplash();
                    return true;
                }
            })());
            // This draws the button picture
            level.drawPicture(midX - 50, midY + 75, 100, 50, "./GameAssets/button.png", -1);
            // Play level 1 button
            // Colors are written in hex values
            level.addStaticTextCentered(150, midY - 100, "Arial", 0x0000FF, 24, "Sky Fighter", 1);
            // No image, so that it doesn't cover the text
            level.addTapControl(50, midY - 125, 200, 50, "", new (class _ extends LolAction {
                go() {
                    level.doLevel(1);
                    return true;
                }
            })());
            // Draw the image behind the text
            level.drawPicture(50, midY - 125, 200, 50, "./GameAssets/button.png", -1);
            // Play level 2 button
            level.addStaticTextCentered(midX, midY - 100, "Arial", 0x0000FF, 24, "Christmas Scramble", 1);
            level.addTapControl(midX - 125, midY - 125, 250, 50, "", new (class _ extends LolAction {
                go() {
                    level.doLevel(2);
                    return true;
                }
            })());
            level.drawPicture(midX - 125, midY - 125, 250, 50, "./GameAssets/button.png", -1);
            // Play level 3 button
            level.addStaticTextCentered(960 - 150, midY - 100, "Arial", 0x0000FF, 24, "Dodgy Plane", 1);
            level.addTapControl(960 - 250, midY - 125, 200, 50, "", new (class _ extends LolAction {
                go() {
                    level.doLevel(3);
                    return true;
                }
            })());
            level.drawPicture(960 - 250, midY - 125, 200, 50, "./GameAssets/button.png", -1);
        }
    }
}
/// <reference path="../library/ScreenManager.ts"/>
/// <reference path="../library/LolAction.ts"/>
/**
 * Technically, Help can be anything... even playable levels. In this
 * demonstration, it's just a bit of information. It's a good place to put
 * instructions, credits, etc.
 */
class Help {
    /**
   * Describe how to draw each level of help. Our help will have 2 screens
   */
    display(index, level) {
        // Our first scene describes the color coding that we use for the
        // different entities in the game
        if (index == 1) {
            // Put in some catchy background muzak
            level.setMusic("./GameAssets/TitleTheme.mp3");
            // Add a background
            level.drawPicture(0, 0, 960, 540, "./GameAssets/TitleBack.png", -2);
            // Set up variables for the middle of the page to aid placement
            let midX = 960 / 2;
            let midY = 540 / 2;
            // Set up a control to go to the splash screen on screen press
            level.addTapControl(0, 0, 960, 540, "", new (class _ extends LolAction {
                go() {
                    level.doSplash();
                    return true;
                }
            })());
            // Add some help messages
            level.addStaticTextCentered(midX, 100, "Arial", 0xFFFFFF, 24, "In these games, WASD is to move", 0);
            level.addStaticTextCentered(midX, 100, "Arial", 0xFFFFFF, 24, "Sky Fight:", 0);
            level.addStaticTextCentered(midX, 200, "Arial", 0xFFFFFF, 24, "Point and click to shoot", 0);
            level.addStaticTextCentered(midX, 300, "Arial", 0xFFFFFF, 24, "Defeat all enemies to win", 0);
            level.addStaticTextCentered(midX, 300, "Arial", 0xFFFFFF, 24, "They have 2 lives, so remember to double tap", 0);
        }
    }
}
/// <reference path="../library/ScreenManager.ts"/>
/**
* Levels is where all of the code goes for describing the different levels of
* the game. If you know how to create methods and classes, you're free to make
* the big "if" statement in this code simply call to your classes and methods.
* Otherwise, put your code directly into the parts of the "if" statement.
*/
class Levels {
    /**
    * We currently have 94 levels, each of which is described in part of the
    * following function.
    */
    display(index, level) {
        /*
        * In this level, you play as an angel who must defeat the evil bats
        * who have taken over your skies. Shoot them all down to win.
        */
        // LEVEL 1: the first demo game
        if (index == 1) {
            // Set the gravity of the game
            level.resetGravity(0, 100);
            // Add some quality theme music
            level.setMusic("./GameAssets/AngelGame/AngelTheme.mp3");
            // Add a background
            level.drawPicture(0, 0, 960, 540, "./GameAssets/AngelGame/SkyBack.png", -2);
            // Place a box around the arena to limit the play area
            level.drawBoundingBox(0, 0, 960, 540, "", 1, 1, 1);
            // Create a hero and assign it to the variable "h"
            // (Here we explicitly state the type of the variable: "Hero")
            let h = level.makeHeroAsBox(600, 400, 48, 48, "./GameAssets/AngelGame/Angel.png");
            h.setStrength(1);
            // Set 'w' to jump (this involves using keycodes)
            // Find the keycode of any key by going to www.keycode.info
            level.setKeyAction(87, level.JumpAction(h, 500), false);
            // The jumps will give 120 pixels of up velocity
            h.setJumpImpulses(0, 130);
            // Let the hero jump in the air to simulate flying
            h.setMultiJumpOn();
            // 'a' key to move left
            level.setKeyAction(65, level.makeXMotionAction(h, -50), true);
            // 'd' key to move right
            level.setKeyAction(68, level.makeXMotionAction(h, 50), true);
            // Three projectiles at a time, each has 1 power
            level.configureProjectiles(10, 8, 8, "./GameAssets/AngelGame/Bullet.png", 1, 0, false);
            // spacebar to shoot
            level.setKeyAction(32, level.makeRepeatThrow(h, 800, 24, 24, 0, 10), true);
            // click to shoot
            //level.setFixedVectorThrowVelocityForProjectiles(150);
            //level.setClickAction(level.ThrowDirectionalAction(h, 24, 24));
            level.setThrowSound("./GameAssets/AngelGame/Shooting.ogg");
            //level.setProjectileVectorDampeningFactor(0.5);
            level.setProjectileRange(540);
            level.setProjectileGravityOn();
            /// Creating the enemies
            // Here we set up an array to make things easier:
            let eArray = new Array();
            eArray[0] = level.makeEnemyAsBox(50, 50, 45, 30, "./GameAssets/AngelGame/Bat.png");
            eArray[1] = level.makeEnemyAsBox(100, 270, 45, 30, "./GameAssets/AngelGame/Bat.png");
            eArray[2] = level.makeEnemyAsBox(500, 120, 45, 30, "./GameAssets/AngelGame/Bat.png");
            eArray[3] = level.makeEnemyAsBox(850, 210, 45, 30, "./GameAssets/AngelGame/Bat.png");
            eArray[4] = level.makeEnemyAsBox(350, 170, 45, 30, "./GameAssets/AngelGame/Bat.png");
            eArray[5] = level.makeEnemyAsBox(650, 350, 45, 30, "./GameAssets/AngelGame/Bat.png");
            // Loop through the elements of the array
            for (let e of eArray) {
                e.setDisappearSound("./GameAssets/AngelGame/EnemyKilled.wav");
                // This makes each enemy need to be hit once to die
                e.setDamage(1);
                // Enemies can fly through each other
                e.setPassThrough(2);
            }
            // Three of the enemies chase the hero
            eArray[0].setChaseFixedMagnitude(h, 25, 25, false, false);
            eArray[1].setChaseFixedMagnitude(h, 35, 30, false, false);
            eArray[5].setChaseFixedMagnitude(h, 15, 15, false, false);
            // While the other three follow a set route
            eArray[2].setRoute((new Route(4)).to(500, 120)
                .to(550, 250)
                .to(800, 300)
                .to(500, 120), 30, true);
            eArray[3].setRoute((new Route(7)).to(850, 210)
                .to(710, 430)
                .to(150, 380)
                .to(120, 200)
                .to(300, 100)
                .to(400, 250)
                .to(850, 210), 40, true);
            eArray[4].setRoute((new Route(5)).to(350, 170)
                .to(380, 250)
                .to(330, 410)
                .to(370, 220)
                .to(350, 170), 30, true);
            /// Making the cloud obstacles
            // Array for the obstacles
            let oArray = new Array();
            // Some variables to size them
            let oSize = 48;
            // Cloud 1
            oArray[0] = level.makeObstacleAsCircle(0, 220, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[1] = level.makeObstacleAsCircle(24, 220, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[2] = level.makeObstacleAsCircle(48, 220, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            // Cloud 2
            oArray[3] = level.makeObstacleAsCircle(150, 0, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[4] = level.makeObstacleAsCircle(174, 0, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[5] = level.makeObstacleAsCircle(162, 24, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            // Cloud 3
            oArray[6] = level.makeObstacleAsCircle(512, 24, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[7] = level.makeObstacleAsCircle(524, 0, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[8] = level.makeObstacleAsCircle(536, 24, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            // Cloud 4
            oArray[9] = level.makeObstacleAsCircle(764, 64, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[10] = level.makeObstacleAsCircle(788, 72, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[11] = level.makeObstacleAsCircle(812, 80, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[12] = level.makeObstacleAsCircle(768, 88, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[13] = level.makeObstacleAsCircle(792, 96, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[14] = level.makeObstacleAsCircle(816, 104, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            // Cloud 5
            oArray[15] = level.makeObstacleAsCircle(224, 248, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[16] = level.makeObstacleAsCircle(248, 248, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[17] = level.makeObstacleAsCircle(212, 272, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[18] = level.makeObstacleAsCircle(236, 272, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[19] = level.makeObstacleAsCircle(260, 272, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            // Cloud 6
            oArray[20] = level.makeObstacleAsCircle(512, 324, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[21] = level.makeObstacleAsCircle(536, 324, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[22] = level.makeObstacleAsCircle(524, 348, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[23] = level.makeObstacleAsCircle(548, 348, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            // Cloud 7
            oArray[24] = level.makeObstacleAsCircle(80, 412, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[25] = level.makeObstacleAsCircle(104, 416, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[26] = level.makeObstacleAsCircle(128, 420, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[27] = level.makeObstacleAsCircle(152, 424, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            // Cloud 8
            oArray[28] = level.makeObstacleAsCircle(836, 396, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[29] = level.makeObstacleAsCircle(860, 392, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[30] = level.makeObstacleAsCircle(884, 388, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[31] = level.makeObstacleAsCircle(908, 384, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[32] = level.makeObstacleAsCircle(932, 380, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            // Cloud 9
            oArray[33] = level.makeObstacleAsCircle(700, 508, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            oArray[34] = level.makeObstacleAsCircle(724, 508, oSize, oSize, "./GameAssets/AngelGame/CloudBall.png");
            // Set the cloud physics
            for (let o of oArray) {
                o.setPhysics(1, 5, 1);
                // So our clouds can be fit together
                o.setPassThrough(1);
            }
            // Player loses if the bats aren't defeated within 3 minutes
            level.setLoseCountdown(180);
            // Add a display for the timer
            level.addDisplay(25, 25, "Arial", "0x000000", 24, "Time Remaining: ", "", level.DisplayLoseCountdown(), 0);
            // Must kill all enemies to win
            level.setVictoryEnemyCount(-1);
        }
        else if (index == 2) {
            //level.addDisplay(25, 25, "Arial", "0x000000", 24, "Enemies Killed: ", "", level.DisplayEnemiesDefeated(), 0);
            // Add some quality theme music
            level.setMusic("./GameAssets/ChristmasGame/ChristmasTheme.mp3");
            // Set the gravity of the game
            level.resetGravity(0, 100);
            // Add a background
            level.drawPicture(0, 0, 960, 540, "./GameAssets/ChristmasGame/ChristmasBack.png", -2);
            // Create a hero
            let robot = level.makeHeroAsBox(600, 400, 48, 48, "./GameAssets/ChristmasGame/Miser.png");
            robot.setStrength(1);
            // Set 'w' to jump (this involves using keycodes)
            // Find the keycode of any key by going to www.keycode.info
            level.setKeyAction(87, level.JumpAction(robot, 0), false);
            // Set 'spacebar' to jump
            level.setKeyAction(32, level.JumpAction(robot, 0), false);
            // 'a' key to move left
            level.setKeyAction(65, level.makeXMotionAction(robot, -50), true);
            // 'd' key to move right
            level.setKeyAction(68, level.makeXMotionAction(robot, 50), true);
            // The jumps will give 120 pixels of up velocity
            robot.setJumpImpulses(0, 164);
            // Make the camera follow our hero
            level.setCameraChase(robot);
            // Make the starting platform
            makePlatform(4, 64, 24, 340);
            /*
             * Here we create a function for making platforms, this makes it easy
             * because platforms consist of multiple blocks
             */
            function makePlatform(blocks, width, posX, posY) {
                if (blocks < 1)
                    return;
                if (blocks == 1) {
                    level.makeObstacleAsBox(posX, posY, width, width, "./GameAssets/ChristmasGame/MiddlePlat.png").setPhysics(1, 0, 2);
                    return;
                }
                level.makeObstacleAsBox(posX, posY, width, width, "./GameAssets/ChristmasGame/LeftEndPlat.png").setPhysics(1, 0, 2);
                level.makeObstacleAsBox(posX + width * (blocks - 1), posY, width, width, "./GameAssets/ChristmasGame/LeftEndPlat.png").setPhysics(1, 0, 2);
                for (let i = 1; i <= (blocks - 2); i++) {
                    level.makeObstacleAsBox(posX + width * i, posY, width, width, "./GameAssets/ChristmasGame/MiddlePlat.png").setPhysics(1, 0, 2);
                }
            }
        }
        else if (index == 3) {
            // Add some quality theme music
            level.setMusic("./GameAssets/PlaneGame/PlaneTheme.ogg");
        }
    }
}
/// <reference path="../library/ScreenManager.ts"/>
/**
* This is the scene that is displayed when you lose a level
*/
class LoseScene {
    /**
    * Implement the display function
    *
    * @param index The level you lost on
    * @param level The physics-based world that comprises the splash screen
    */
    display(index, level) {
        // Configure our win screen
        // Add a background
        level.drawPicture(0, 0, 960, 540, "./GameAssets/TitleBack.png", -2);
        // Add a degrading message to make the player feel bad about themself
        level.addStaticTextCentered(960 / 2, 540 / 2, "Arial", 0x0000FF, 32, "You lost, try being better", 0);
        // Make it so they can click to go back to the level select screen
        level.addTapControl(0, 0, 960, 540, "", new (class _ extends LolAction {
            go() {
                level.doLevel(index);
                return true;
            }
        })());
    }
}
/// <reference path="../library/ScreenManager.ts"/>
/**
* Splash encapsulates the code that will be run to configure the opening screen of the game.
* Typically this has buttons for playing, getting help, and quitting.
*/
class Splash {
    /**
    * There is usually only one splash screen. However, the ScreenManager interface requires
    * display() to take a parameter for which screen to display.  We ignore it.
    *
    * @param index Which splash screen should be displayed (typically you can ignore this)
    * @param level The physics-based world that comprises the splash screen
    */
    display(index, level) {
        // Put in some catchy background muzak
        level.setMusic("./GameAssets/TitleTheme.mp3");
        // Add a background
        level.drawPicture(0, 0, 960, 540, "./GameAssets/TitleBack.png", -2);
        // Set up variables for the middle of the page to aid placement
        let midX = 960 / 2;
        let midY = 540 / 2;
        // Add a button for level select (text, button, and image are separate)
        // The text is centered so the x and y will be of the center of the text
        level.addStaticTextCentered(midX, midY - 50, "Arial", 0x0000FF, 24, "Play", 0);
        // This control however will use cooridinates starting in the top left corner
        level.addTapControl(midX - 50, midY - 75, 100, 50, "", new (class _ extends LolAction {
            go() {
                level.doChooser(1);
                return true;
            }
        })());
        // The picture is also drawn from the top left corner
        level.drawPicture(midX - 50, midY - 75, 100, 50, "./GameAssets/button.png", -1);
        // This button is for the help screen
        level.addStaticTextCentered(midX, midY + 50, "Arial", 0x0000FF, 24, "Help", 0);
        level.addTapControl(midX - 50, midY + 25, 100, 50, "", new (class _ extends LolAction {
            go() {
                level.doHelp(1);
                return true;
            }
        })());
        level.drawPicture(midX - 50, midY + 25, 100, 50, "./GameAssets/button.png", -1);
    }
}
/// <reference path="../library/ScreenManager.ts"/>
/**
* This is the scene that is displayed when you win a level
*/
class WinScene {
    /**
    * Implement the display function
    *
    * @param index Which level you won
    * @param level The public api
    */
    display(index, level) {
        // Configure our win screen
        // Add a background
        level.drawPicture(0, 0, 960, 540, "./GameAssets/TitleBack.png", -2);
        // Add an uplifting message
        level.addStaticTextCentered(960 / 2, 540 / 2, "Arial", 0x00FFFF, 32, "You Win!! You must be super cool!", 0);
        // Make it so they can click to go back to the level select screen
        level.addTapControl(0, 0, 960, 540, "", new (class _ extends LolAction {
            go() {
                level.doChooser(1);
                return true;
            }
        })());
    }
}
/// <reference path="../library/Config.ts"/>
/// <reference path="./Levels.ts"/>
/// <reference path="./Chooser.ts"/>
/// <reference path="./Help.ts"/>
/// <reference path="./Splash.ts"/>
/// <reference path="./WinScene.ts"/>
/// <reference path="./LoseScene.ts"/>
/**
* Any configuration that the programmer needs to provide to Lol should go here.
* <p/>
* Config stores things like screen dimensions, default text and font configuration,
* and the names of all the assets (images and sounds) used by the game.
* <p/>
* Be sure to look at the Levels.java file for how each level of the game is
* drawn, as well as Splash.ts, Chooser.ts, Help.ts.
*/
class MyConfig extends Config {
    /**
    * The MyConfig object is used to pass configuration information to the LOL
    * system.
    * <p/>
    * To see documentation for any of these variables, hover your mouse
    * over the word on the left side of the equals sign.
    */
    constructor() {
        super();
        // The size of the screen, and some game behavior configuration
        this.mWidth = 960;
        this.mHeight = 540;
        this.mPixelMeterRatio = 20;
        this.mEnableVibration = true;
        this.mGameTitle = "Micah's Basic Game";
        this.mDefaultWinText = "Good Job";
        this.mDefaultLoseText = "Try Again";
        //this.mShowDebugBoxes = true;
        // Chooser configuration
        this.mNumLevels = 1;
        this.mEnableChooser = true;
        this.mUnlockAllLevels = true;
        // Font configuration
        this.mDefaultFontFace = "Arial";
        this.mDefaultFontSize = 32;
        this.mDefaultFontColor = "#FFFFFF";
        // list the images that the game will use
        this.mImageNames = new Array("./GameAssets/button.png", "./GameAssets/TitleBack.png", "./GameAssets/AngelGame/Angel.png", "./GameAssets/AngelGame/Bat.png", "./GameAssets/AngelGame/Bullet.png", "./GameAssets/AngelGame/CloudBall.png", "./GameAssets/AngelGame/SkyBack.png", "./GameAssets/ChristmasGame/ArrowSign.png", "./GameAssets/ChristmasGame/ChristmasBack.png", "./GameAssets/ChristmasGame/Crate.png", "./GameAssets/ChristmasGame/GoldCoin.png", "./GameAssets/ChristmasGame/IceBox.png", "./GameAssets/ChristmasGame/Igloo.png", "./GameAssets/ChristmasGame/LeftEndPlat.png", "./GameAssets/ChristmasGame/MiddlePlat.png", "./GameAssets/ChristmasGame/Miser.png", "./GameAssets/ChristmasGame/OneTree.png", "./GameAssets/ChristmasGame/RightEndPlat.png", "./GameAssets/ChristmasGame/Santa.png", "./GameAssets/ChristmasGame/SnowMan.png", "./GameAssets/ChristmasGame/Stone.png", "./GameAssets/ChristmasGame/ThreeTrees.png", "./GameAssets/PlaneGame/Plane.png", "./GameAssets/PlaneGame/PlaneBack.png", "./GameAssets/PlaneGame/RockUp.png", "./GameAssets/PlaneGame/RockDown.png");
        // list the sound effects that the game will use
        this.mSoundNames = new Array("./GameAssets/AngelGame/Shooting.ogg", "./GameAssets/AngelGame/EnemyKilled.wav", "./GameAssets/ChristmasGame/MoneyGet.wav", "./GameAssets/PlaneGame/Crash.ogg");
        // list the background music files that the game will use
        this.mMusicNames = new Array("./GameAssets/TitleTheme.mp3", "./GameAssets/AngelGame/AngelTheme.mp3", "./GameAssets/ChristmasGame/ChristmasTheme.mp3", "./GameAssets/PlaneGame/PlaneTheme.ogg");
        // don't change these lines unless you know what you are doing
        this.mLevels = new Levels();
        this.mChooser = new Chooser();
        this.mHelp = new Help();
        this.mSplash = new Splash();
        this.mWin = new WinScene();
        this.mLose = new LoseScene();
    }
}
/// <reference path="../library/Config.ts"/>
/// <reference path="../library/Lol.ts"/>
/// <reference path="../library/Level.ts"/>
/// <reference path="./MyConfig.ts"/>
/// <reference path="../library/typedefinitions/physicstype2d/PhysicsType2d.v0_9.d.ts"/>
//// <reference path="./typedefinitions/pixi.js/index.d.ts"/>
/// <reference types="pixi.js"/>
document.addEventListener("DOMContentLoaded", () => {
    PIXI.utils.sayHello("Hello");
    let myConfig = new MyConfig();
    let game = new Lol(myConfig);
    game.create();
    document.body.appendChild(game.mRenderer.view);
    requestAnimationFrame(() => gameLoop(game));
});
function gameLoop(game) {
    game.render();
    requestAnimationFrame(() => gameLoop(game));
}

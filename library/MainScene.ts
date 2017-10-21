class MainScene extends LolScene {
  mChaseActor: WorldActor;
  mCamera: Camera;

  constructor(config: Config, media: Media) {
    super(config, media);
  }

  chaseActor(hero: WorldActor) {
    this.mChaseActor = hero;
    this.mCamera.setChase(hero);
  }

  // /**
  //   * Configure physics for the current level
  //   */
  //  private void configureCollisionHandlers() {
  //      // set up the collision handlers
  //      mWorld.setContactListener(new ContactListener() {
  //          /**
  //           * When two bodies start to collide, we can use this to forward to our onCollide methods
  //           *
  //           * @param contact A description of the contact event
  //           */
  //          @Override
  //          public void beginContact(final Contact contact) {
  //              // Get the bodies, make sure both are actors
  //              Object a = contact.getFixtureA().getBody().getUserData();
  //              Object b = contact.getFixtureB().getBody().getUserData();
  //              if (!(a instanceof WorldActor) || !(b instanceof WorldActor))
  //                  return;
  //
  //              // the order is Hero, Enemy, Goodie, Projectile, Obstacle, Destination
  //              //
  //              // Of those, Hero, Enemy, and Projectile are the only ones with
  //              // a non-empty onCollide
  //              final WorldActor c0;
  //              final WorldActor c1;
  //              if (a instanceof Hero) {
  //                  c0 = (WorldActor) a;
  //                  c1 = (WorldActor) b;
  //              } else if (b instanceof Hero) {
  //                  c0 = (WorldActor) b;
  //                  c1 = (WorldActor) a;
  //              } else if (a instanceof Enemy) {
  //                  c0 = (WorldActor) a;
  //                  c1 = (WorldActor) b;
  //              } else if (b instanceof Enemy) {
  //                  c0 = (WorldActor) b;
  //                  c1 = (WorldActor) a;
  //              } else if (a instanceof Projectile) {
  //                  c0 = (WorldActor) a;
  //                  c1 = (WorldActor) b;
  //              } else if (b instanceof Projectile) {
  //                  c0 = (WorldActor) b;
  //                  c1 = (WorldActor) a;
  //              } else {
  //                  return;
  //              }
  //
  //              // Schedule an event to run as soon as the physics world finishes its step.
  //              //
  //              // NB: this is called from render, while world is updating.  We can't modify the
  //              // world or its actors until the update finishes, so we have to schedule
  //              // collision-based updates to run after the world update.
  //              mOneTimeEvents.add(new LolAction() {
  //                  @Override
  //                  public void go() {
  //                      c0.onCollide(c1, contact);
  //                  }
  //              });
  //          }
  //
  //          /**
  //           * We ignore endcontact
  //           *
  //           * @param contact A description of the contact event
  //           */
  //          @Override
  //          public void endContact(Contact contact) {
  //          }
  //
  //          /**
  //           * Presolve is a hook for disabling certain collisions. We use it
  //           * for collision immunity, sticky obstacles, and one-way walls
  //           *
  //           * @param contact A description of the contact event
  //           * @param oldManifold The manifold from the previous world step
  //           */
  //          @Override
  //          public void preSolve(Contact contact, Manifold oldManifold) {
  //              // get the bodies, make sure both are actors
  //              Object a = contact.getFixtureA().getBody().getUserData();
  //              Object b = contact.getFixtureB().getBody().getUserData();
  //              if (!(a instanceof WorldActor) || !(b instanceof WorldActor))
  //                  return;
  //              WorldActor gfoA = (WorldActor) a;
  //              WorldActor gfoB = (WorldActor) b;
  //
  //              // go sticky obstacles... only do something if at least one actor is a sticky actor
  //              if (gfoA.mIsSticky[0] || gfoA.mIsSticky[1] || gfoA.mIsSticky[2] || gfoA.mIsSticky[3]) {
  //                  handleSticky(gfoA, gfoB, contact);
  //                  return;
  //              } else if (gfoB.mIsSticky[0] || gfoB.mIsSticky[1] || gfoB.mIsSticky[2] || gfoB.mIsSticky[3]) {
  //                  handleSticky(gfoB, gfoA, contact);
  //                  return;
  //              }
  //
  //              // if the actors have the same passthrough ID, and it's  not zero, then disable the
  //              // contact
  //              if (gfoA.mPassThroughId != 0 && gfoA.mPassThroughId == gfoB.mPassThroughId) {
  //                  contact.setEnabled(false);
  //                  return;
  //              }
  //
  //              // is either one-sided? If not, we're done
  //              WorldActor oneSided = null;
  //              WorldActor other;
  //              if (gfoA.mIsOneSided > -1) {
  //                  oneSided = gfoA;
  //                  other = gfoB;
  //              } else if (gfoB.mIsOneSided > -1) {
  //                  oneSided = gfoB;
  //                  other = gfoA;
  //              } else {
  //                  return;
  //              }
  //
  //              // if we're here, see if we should be disabling a one-sided obstacle collision
  //              WorldManifold worldManiFold = contact.getWorldManifold();
  //              int numPoints = worldManiFold.getNumberOfContactPoints();
  //              for (int i = 0; i < numPoints; i++) {
  //                  Vector2 vector2 = other.mBody.getLinearVelocityFromWorldPoint(worldManiFold.getPoints()[i]);
  //                  // disable based on the value of isOneSided and the vector between the actors
  //                  if (oneSided.mIsOneSided == 0 && vector2.y < 0)
  //                      contact.setEnabled(false);
  //                  else if (oneSided.mIsOneSided == 2 && vector2.y > 0)
  //                      contact.setEnabled(false);
  //                  else if (oneSided.mIsOneSided == 1 && vector2.x > 0)
  //                      contact.setEnabled(false);
  //                  else if (oneSided.mIsOneSided == 3 && vector2.x < 0)
  //                      contact.setEnabled(false);
  //              }
  //          }
  //
  //          /**
  //           * We ignore postsolve
  //           *
  //           * @param contact A description of the contact event
  //           * @param impulse The impulse of the contact
  //           */
  //          @Override
  //          public void postSolve(Contact contact, ContactImpulse impulse) {
  //          }
  //      });
  //  }


  render(): boolean {
    this.mRenderables.forEach((e) => {
      e.render();
    });
    return true;
  }


}

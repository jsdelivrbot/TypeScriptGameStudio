/**
 * Renderable is the base of all objects that can be displayed on the screen.  At its most simple
 * level, a Renderable is simply a function (<code>onRender</code>), and a flag to indicate whether
 * the object is currently active and enabled, or disabled.
 */
abstract class Renderable {

  /// Track if the object is currently allowed to be rendered.
  /// When it is false, we don't run any updates on the object
  mEnabled: boolean;

  constructor() {
    this.mEnabled = true;
  }

  public setEnabled(val: boolean) {
    this.mEnabled = val;
  }

  public getEnabled() {
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

  /**
   * User-provided code to run when a renderable object is enabled and
   * ready to be rendered.
   */
  abstract onRender(): void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { noChange } from 'lit';
import { directive, Directive, ElementPart, PartInfo, PartType } from 'lit/directive.js';
import { fireEvent } from 'custom-card-helpers';
import type { ActionHandlerOptions } from 'custom-card-helpers/dist/types';

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

interface ActionHandlerElement extends HTMLElement {
  actionHandler?: boolean;
}

declare global {
  interface HASSDomEvents {
    action: { action: string };
  }
}

class ActionHandlerImpl extends HTMLElement {
  public holdTime = 500;
  public ripple: any;

  protected timer?: number;
  protected held = false;
  private dblClickTimeout?: number;

  constructor() {
    super();
    this.ripple = document.createElement('mwc-ripple');
  }

  public connectedCallback(): void {
    Object.assign(this.style, {
      position: 'absolute',
      width: isTouch ? '100px' : '50px',
      height: isTouch ? '100px' : '50px',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: '999',
    });
    this.appendChild(this.ripple);
    this.ripple.primary = true;

    ['touchcancel', 'mouseout', 'mouseup', 'touchmove', 'mousewheel', 'wheel', 'scroll'].forEach((ev) => {
      document.addEventListener(
        ev,
        () => {
          clearTimeout(this.timer);
          this._stopAnimation();
          this.timer = undefined;
        },
        { passive: true },
      );
    });
  }

  public bind(element: ActionHandlerElement, options: ActionHandlerOptions): void {
    if (element.actionHandler) return;
    element.actionHandler = true;

    element.addEventListener('contextmenu', (ev: Event) => {
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    });

    const start = (ev: Event): void => {
      this.held = false;
      const { pageX, pageY } = (ev as TouchEvent).touches ? (ev as TouchEvent).touches[0] : (ev as MouseEvent);
      this.timer = window.setTimeout(() => {
        this._startAnimation(pageX, pageY);
        this.held = true;
      }, this.holdTime);
    };

    const end = (ev: Event): void => {
      ev.preventDefault();
      if (['touchend', 'touchcancel'].includes(ev.type) && this.timer === undefined) return;
      clearTimeout(this.timer);
      this._stopAnimation();
      this.timer = undefined;
      if (this.held) {
        fireEvent(element, 'action', { action: 'hold' });
      } else if (options.hasDoubleClick) {
        if ((ev.type === 'click' && (ev as MouseEvent).detail < 2) || !this.dblClickTimeout) {
          this.dblClickTimeout = window.setTimeout(() => {
            this.dblClickTimeout = undefined;
            fireEvent(element, 'action', { action: 'tap' });
          }, 250);
        } else {
          clearTimeout(this.dblClickTimeout);
          this.dblClickTimeout = undefined;
          fireEvent(element, 'action', { action: 'double_tap' });
        }
      } else {
        fireEvent(element, 'action', { action: 'tap' });
      }
    };

    const handleEnter = (ev: KeyboardEvent): void => {
      if (ev.key !== 'Enter') return;
      end(ev);
    };

    element.addEventListener('touchstart', start, { passive: true });
    element.addEventListener('touchend', end);
    element.addEventListener('touchcancel', end);
    element.addEventListener('mousedown', start, { passive: true });
    element.addEventListener('click', end);
    element.addEventListener('keyup', handleEnter);
  }

  private _startAnimation(x: number, y: number): void {
    Object.assign(this.style, { left: `${x}px`, top: `${y}px`, display: null });
    this.ripple.disabled = false;
    this.ripple.active = true;
    this.ripple.unbounded = true;
  }

  private _stopAnimation(): void {
    this.ripple.active = false;
    this.ripple.disabled = true;
    this.style.display = 'none';
  }
}

customElements.define('action-handler-mailandpackages', ActionHandlerImpl);

const getActionHandler = (): ActionHandlerImpl => {
  const existing = document.body.querySelector('action-handler-mailandpackages');
  if (existing) return existing as ActionHandlerImpl;
  const handler = document.createElement('action-handler-mailandpackages') as ActionHandlerImpl;
  document.body.appendChild(handler);
  return handler;
};

class ActionHandlerDirective extends Directive {
  private _options: ActionHandlerOptions;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error('actionHandler must be used on an element');
    }
    this._options = {};
  }

  update(part: ElementPart, [options]: [ActionHandlerOptions]): void {
    this._options = options;
    const handler = getActionHandler();
    handler.bind(part.element as ActionHandlerElement, options);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_options: ActionHandlerOptions) {
    return noChange;
  }
}

export const actionHandler = directive(ActionHandlerDirective);

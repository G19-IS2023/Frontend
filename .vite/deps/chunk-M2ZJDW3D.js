import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  NavbarContext_default,
  Offcanvas_default,
  TransitionWrapper_default,
  _objectWithoutPropertiesLoose,
  css_default,
  transitionEndListener,
  triggerBrowserReflow,
  useEventCallback
} from "./chunk-MALNRAGZ.js";
import {
  require_classnames,
  require_jsx_runtime,
  useBootstrapPrefix
} from "./chunk-PMTCDWDV.js";
import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  __commonJS,
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/invariant/browser.js
var require_browser = __commonJS({
  "node_modules/invariant/browser.js"(exports, module) {
    "use strict";
    var invariant3 = function(condition, format, a, b, c, d, e, f) {
      if (true) {
        if (format === void 0) {
          throw new Error("invariant requires an error message argument");
        }
      }
      if (!condition) {
        var error;
        if (format === void 0) {
          error = new Error(
            "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
          );
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(
            format.replace(/%s/g, function() {
              return args[argIndex++];
            })
          );
          error.name = "Invariant Violation";
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant3;
  }
});

// node_modules/react-bootstrap/esm/Navbar.js
var import_classnames5 = __toESM(require_classnames());
var React9 = __toESM(require_react());
var import_react7 = __toESM(require_react());

// node_modules/@restart/ui/esm/SelectableContext.js
var React = __toESM(require_react());
var SelectableContext = React.createContext(null);
var makeEventKey = (eventKey, href = null) => {
  if (eventKey != null)
    return String(eventKey);
  return href || null;
};
var SelectableContext_default = SelectableContext;

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// node_modules/uncontrollable/lib/esm/hook.js
var import_react = __toESM(require_react());

// node_modules/uncontrollable/lib/esm/utils.js
var import_invariant = __toESM(require_browser());
function defaultKey(key) {
  return "default" + key.charAt(0).toUpperCase() + key.substr(1);
}

// node_modules/uncontrollable/lib/esm/hook.js
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function useUncontrolledProp(propValue, defaultValue, handler) {
  var wasPropRef = (0, import_react.useRef)(propValue !== void 0);
  var _useState = (0, import_react.useState)(defaultValue), stateValue = _useState[0], setState = _useState[1];
  var isProp2 = propValue !== void 0;
  var wasProp = wasPropRef.current;
  wasPropRef.current = isProp2;
  if (!isProp2 && wasProp && stateValue !== defaultValue) {
    setState(defaultValue);
  }
  return [isProp2 ? propValue : stateValue, (0, import_react.useCallback)(function(value) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (handler)
      handler.apply(void 0, [value].concat(args));
    setState(value);
  }, [handler])];
}
function useUncontrolled(props, config) {
  return Object.keys(config).reduce(function(result, fieldName) {
    var _extends2;
    var _ref = result, defaultValue = _ref[defaultKey(fieldName)], propsValue = _ref[fieldName], rest = _objectWithoutPropertiesLoose(_ref, [defaultKey(fieldName), fieldName].map(_toPropertyKey));
    var handlerName = config[fieldName];
    var _useUncontrolledProp = useUncontrolledProp(propsValue, defaultValue, props[handlerName]), value = _useUncontrolledProp[0], handler = _useUncontrolledProp[1];
    return _extends({}, rest, (_extends2 = {}, _extends2[fieldName] = value, _extends2[handlerName] = handler, _extends2));
  }, props);
}

// node_modules/uncontrollable/lib/esm/uncontrollable.js
var import_react2 = __toESM(require_react());

// node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js
function componentWillMount() {
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== void 0) {
    this.setState(state);
  }
}
function componentWillReceiveProps(nextProps) {
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== void 0 ? state : null;
  }
  this.setState(updater.bind(this));
}
function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

// node_modules/uncontrollable/lib/esm/uncontrollable.js
var import_invariant2 = __toESM(require_browser());

// node_modules/react-bootstrap/esm/NavbarBrand.js
var import_classnames = __toESM(require_classnames());
var React3 = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var NavbarBrand = React3.forwardRef(({
  bsPrefix,
  className,
  as,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-brand");
  const Component = as || (props.href ? "a" : "span");
  return (0, import_jsx_runtime.jsx)(Component, {
    ...props,
    ref,
    className: (0, import_classnames.default)(className, bsPrefix)
  });
});
NavbarBrand.displayName = "NavbarBrand";
var NavbarBrand_default = NavbarBrand;

// node_modules/react-bootstrap/esm/NavbarCollapse.js
var React5 = __toESM(require_react());
var import_react4 = __toESM(require_react());

// node_modules/react-bootstrap/esm/Collapse.js
var import_classnames2 = __toESM(require_classnames());
var import_react3 = __toESM(require_react());

// node_modules/react-bootstrap/esm/createChainedFunction.js
function createChainedFunction(...funcs) {
  return funcs.filter((f) => f != null).reduce((acc, f) => {
    if (typeof f !== "function") {
      throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");
    }
    if (acc === null)
      return f;
    return function chainedFunction(...args) {
      acc.apply(this, args);
      f.apply(this, args);
    };
  }, null);
}
var createChainedFunction_default = createChainedFunction;

// node_modules/react-bootstrap/esm/Collapse.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var MARGINS = {
  height: ["marginTop", "marginBottom"],
  width: ["marginLeft", "marginRight"]
};
function getDefaultDimensionValue(dimension, elem) {
  const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  const value = elem[offset];
  const margins = MARGINS[dimension];
  return value + // @ts-ignore
  parseInt(css_default(elem, margins[0]), 10) + // @ts-ignore
  parseInt(css_default(elem, margins[1]), 10);
}
var collapseStyles = {
  [EXITED]: "collapse",
  [EXITING]: "collapsing",
  [ENTERING]: "collapsing",
  [ENTERED]: "collapse show"
};
var Collapse = import_react3.default.forwardRef(({
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  className,
  children,
  dimension = "height",
  in: inProp = false,
  timeout = 300,
  mountOnEnter = false,
  unmountOnExit = false,
  appear = false,
  getDimensionValue = getDefaultDimensionValue,
  ...props
}, ref) => {
  const computedDimension = typeof dimension === "function" ? dimension() : dimension;
  const handleEnter = (0, import_react3.useMemo)(() => createChainedFunction_default((elem) => {
    elem.style[computedDimension] = "0";
  }, onEnter), [computedDimension, onEnter]);
  const handleEntering = (0, import_react3.useMemo)(() => createChainedFunction_default((elem) => {
    const scroll = `scroll${computedDimension[0].toUpperCase()}${computedDimension.slice(1)}`;
    elem.style[computedDimension] = `${elem[scroll]}px`;
  }, onEntering), [computedDimension, onEntering]);
  const handleEntered = (0, import_react3.useMemo)(() => createChainedFunction_default((elem) => {
    elem.style[computedDimension] = null;
  }, onEntered), [computedDimension, onEntered]);
  const handleExit = (0, import_react3.useMemo)(() => createChainedFunction_default((elem) => {
    elem.style[computedDimension] = `${getDimensionValue(computedDimension, elem)}px`;
    triggerBrowserReflow(elem);
  }, onExit), [onExit, getDimensionValue, computedDimension]);
  const handleExiting = (0, import_react3.useMemo)(() => createChainedFunction_default((elem) => {
    elem.style[computedDimension] = null;
  }, onExiting), [computedDimension, onExiting]);
  return (0, import_jsx_runtime2.jsx)(TransitionWrapper_default, {
    ref,
    addEndListener: transitionEndListener,
    ...props,
    "aria-expanded": props.role ? inProp : null,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
    onExit: handleExit,
    onExiting: handleExiting,
    childRef: children.ref,
    in: inProp,
    timeout,
    mountOnEnter,
    unmountOnExit,
    appear,
    children: (state, innerProps) => import_react3.default.cloneElement(children, {
      ...innerProps,
      className: (0, import_classnames2.default)(className, children.props.className, collapseStyles[state], computedDimension === "width" && "collapse-horizontal")
    })
  });
});
var Collapse_default = Collapse;

// node_modules/react-bootstrap/esm/NavbarCollapse.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var NavbarCollapse = React5.forwardRef(({
  children,
  bsPrefix,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-collapse");
  const context = (0, import_react4.useContext)(NavbarContext_default);
  return (0, import_jsx_runtime3.jsx)(Collapse_default, {
    in: !!(context && context.expanded),
    ...props,
    children: (0, import_jsx_runtime3.jsx)("div", {
      ref,
      className: bsPrefix,
      children
    })
  });
});
NavbarCollapse.displayName = "NavbarCollapse";
var NavbarCollapse_default = NavbarCollapse;

// node_modules/react-bootstrap/esm/NavbarToggle.js
var import_classnames3 = __toESM(require_classnames());
var React6 = __toESM(require_react());
var import_react5 = __toESM(require_react());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var NavbarToggle = React6.forwardRef(({
  bsPrefix,
  className,
  children,
  label = "Toggle navigation",
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = "button",
  onClick,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-toggler");
  const {
    onToggle,
    expanded
  } = (0, import_react5.useContext)(NavbarContext_default) || {};
  const handleClick = useEventCallback((e) => {
    if (onClick)
      onClick(e);
    if (onToggle)
      onToggle();
  });
  if (Component === "button") {
    props.type = "button";
  }
  return (0, import_jsx_runtime4.jsx)(Component, {
    ...props,
    ref,
    onClick: handleClick,
    "aria-label": label,
    className: (0, import_classnames3.default)(className, bsPrefix, !expanded && "collapsed"),
    children: children || (0, import_jsx_runtime4.jsx)("span", {
      className: `${bsPrefix}-icon`
    })
  });
});
NavbarToggle.displayName = "NavbarToggle";
var NavbarToggle_default = NavbarToggle;

// node_modules/react-bootstrap/esm/NavbarOffcanvas.js
var React7 = __toESM(require_react());
var import_react6 = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var NavbarOffcanvas = React7.forwardRef((props, ref) => {
  const context = (0, import_react6.useContext)(NavbarContext_default);
  return (0, import_jsx_runtime5.jsx)(Offcanvas_default, {
    ref,
    show: !!(context != null && context.expanded),
    ...props,
    renderStaticNode: true
  });
});
NavbarOffcanvas.displayName = "NavbarOffcanvas";
var NavbarOffcanvas_default = NavbarOffcanvas;

// node_modules/react-bootstrap/esm/NavbarText.js
var React8 = __toESM(require_react());
var import_classnames4 = __toESM(require_classnames());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var NavbarText = React8.forwardRef(({
  className,
  bsPrefix,
  as: Component = "span",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-text");
  return (0, import_jsx_runtime6.jsx)(Component, {
    ref,
    className: (0, import_classnames4.default)(className, bsPrefix),
    ...props
  });
});
NavbarText.displayName = "NavbarText";
var NavbarText_default = NavbarText;

// node_modules/react-bootstrap/esm/Navbar.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var Navbar = React9.forwardRef((props, ref) => {
  const {
    bsPrefix: initialBsPrefix,
    expand = true,
    variant = "light",
    bg,
    fixed,
    sticky,
    className,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = "nav",
    expanded,
    onToggle,
    onSelect,
    collapseOnSelect = false,
    ...controlledProps
  } = useUncontrolled(props, {
    expanded: "onToggle"
  });
  const bsPrefix = useBootstrapPrefix(initialBsPrefix, "navbar");
  const handleCollapse = (0, import_react7.useCallback)((...args) => {
    onSelect == null ? void 0 : onSelect(...args);
    if (collapseOnSelect && expanded) {
      onToggle == null ? void 0 : onToggle(false);
    }
  }, [onSelect, collapseOnSelect, expanded, onToggle]);
  if (controlledProps.role === void 0 && Component !== "nav") {
    controlledProps.role = "navigation";
  }
  let expandClass = `${bsPrefix}-expand`;
  if (typeof expand === "string")
    expandClass = `${expandClass}-${expand}`;
  const navbarContext = (0, import_react7.useMemo)(() => ({
    onToggle: () => onToggle == null ? void 0 : onToggle(!expanded),
    bsPrefix,
    expanded: !!expanded,
    expand
  }), [bsPrefix, expanded, expand, onToggle]);
  return (0, import_jsx_runtime7.jsx)(NavbarContext_default.Provider, {
    value: navbarContext,
    children: (0, import_jsx_runtime7.jsx)(SelectableContext_default.Provider, {
      value: handleCollapse,
      children: (0, import_jsx_runtime7.jsx)(Component, {
        ref,
        ...controlledProps,
        className: (0, import_classnames5.default)(className, bsPrefix, expand && expandClass, variant && `${bsPrefix}-${variant}`, bg && `bg-${bg}`, sticky && `sticky-${sticky}`, fixed && `fixed-${fixed}`)
      })
    })
  });
});
Navbar.displayName = "Navbar";
var Navbar_default = Object.assign(Navbar, {
  Brand: NavbarBrand_default,
  Collapse: NavbarCollapse_default,
  Offcanvas: NavbarOffcanvas_default,
  Text: NavbarText_default,
  Toggle: NavbarToggle_default
});

export {
  require_browser,
  useUncontrolledProp,
  useUncontrolled,
  createChainedFunction_default,
  Collapse_default,
  makeEventKey,
  SelectableContext_default,
  NavbarBrand_default,
  NavbarCollapse_default,
  NavbarToggle_default,
  NavbarOffcanvas_default,
  NavbarText_default,
  Navbar_default
};
//# sourceMappingURL=chunk-M2ZJDW3D.js.map

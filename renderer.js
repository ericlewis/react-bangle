import ReactFiberReconciler from 'react-reconciler';
import {
  unstable_scheduleCallback as schedulePassiveEffects,
  unstable_cancelCallback as cancelPassiveEffects
} from 'scheduler';
import View from './ViewNode'
import Text from './TextNode'

const emptyObject = {};

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => {
    return emptyObject;
  },
  getChildHostContext: () => {
    return emptyObject;
  },
  createInstance: (type, newProps, _rootContainerInstance, _currentHostContext, _workInProgress) => {
    if (type === "text") {
      return new Text(newProps)
    }

    return new View(newProps)
  },
  createTextInstance: (text, _rootContainerInstance, _hostContext, _internalInstanceHandle) => {   
    return new Text({text});
  },
  finalizeInitialChildren: (_parent, _type, _props) => {
    return false
  },
  prepareForCommit: () => {
    // noop
  },
  prepareUpdate(_domElement, _oldProps, _newProps) {
    return {};
  },
  resetAfterCommit: (_parent) => {
  },
  shouldSetTextContent: (_type, _props) => {
    return false;
  },
  supportsMutation: true,
  appendInitialChild: (parent, child) => {
    parent.appendChild(child)
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child);
  },
  insertBefore(parent, child, beforeChild) {
    parent.appendChildBefore(child, beforeChild);
  },
  removeChild(parent, child) {
    parent.removeChild(child)
  },
  removeChildFromContainer(parent, child) {
    parent.removeChild(child)
  },
  commitTextUpdate(textInstance, _oldText, newText) {
    textInstance.update(newText);
  },
  commitUpdate(instance, _updatePayload, _type, _oldProps, newProps) {
    instance.update(newProps);
  },
  schedulePassiveEffects,
  cancelPassiveEffects,
};
const ReactReconcilerInst = ReactFiberReconciler(hostConfig);
export default {
  render: (reactElement, domElement, callback) => {
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
    }

    return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
  }
};
export var ComponentState;
(function (ComponentState) {
    ComponentState[ComponentState["idle"] = 0] = "idle";
    ComponentState[ComponentState["mounting"] = 1] = "mounting";
    ComponentState[ComponentState["mounted"] = 2] = "mounted";
    ComponentState[ComponentState["loading"] = 3] = "loading";
    ComponentState[ComponentState["loaded"] = 4] = "loaded";
    ComponentState[ComponentState["unmounting"] = 5] = "unmounting";
    ComponentState[ComponentState["unmounted"] = 6] = "unmounted";
})(ComponentState || (ComponentState = {}));
//# sourceMappingURL=component-state.enum.js.map
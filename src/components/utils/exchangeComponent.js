export function exchangeComponent(oldComponent, newComponent) {
  oldComponent.parentNode.replaceChild(newComponent, oldComponent);
}

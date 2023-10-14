export function primaryDimensionTransName(name) {
  switch (name) {
    case "Ereignisname":
      name = "Events.getName";
      break;
    case "Ereignisaktion":
      name = "Events.getAction";
      break;
    case "Ereigniskategorie":
      name = "Events.getCategory";
      break;

    default:
      name = "";
      break;
  }
  return name;
}

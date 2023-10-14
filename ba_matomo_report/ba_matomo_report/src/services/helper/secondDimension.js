export function secondDimensionTranslateName(secondDimensionName) {
  switch (secondDimensionName) {
    case "Ereignisname":
      secondDimensionName = "eventName";
      break;
    case "Ereigniskategorie":
      secondDimensionName = "eventCategory";
      break;
    case "Ereignisaktion":
      secondDimensionName = "eventAction";
      break;
    default:
      break;
  }
  return secondDimensionName;
}

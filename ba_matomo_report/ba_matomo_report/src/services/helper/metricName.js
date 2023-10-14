export function metricTranslateName(name) {
  switch (name) {
    case "Besuchen":
      name = "visits";
      break;
    case "Ereignisse":
      name = "events";
      break;

    default:
      name = "";
      break;
  }
  return name;
}

import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import {
  DragAndDrop,
  RenderCellEventArgs,
  Resize,
  Schedule,
  TimelineViews,
} from "@syncfusion/ej2-schedule";

Schedule.Inject(TimelineViews, Resize, DragAndDrop);

const dataManagerEvents: DataManager = new DataManager({
  url: "http://localhost:1338/api/getEventsData",
  adaptor: new UrlAdaptor(),
  batchUrl: "http://localhost:1338/api/batchEventsData",
});

const dataManagerResources: DataManager = new DataManager({
  url: "http://localhost:1338/api/getResourcesData",
  adaptor: new UrlAdaptor(),
});

const scheduleObj: Schedule = new Schedule({
  width: "100%",
  height: "100vh",
  selectedDate: new Date(2024, 3, 15),
  currentView: "TimelineWeek",
  views: ["TimelineWeek"],
  group: {
    allowGroupEdit: true,
    resources: ["Resource"],
  },
  resources: [
    {
      field: "ResourceId",
      title: "Resources",
      name: "Resource",
      allowMultiple: true,
      dataSource: dataManagerResources,
    },
  ],
  eventSettings: {
    dataSource: dataManagerEvents,
  },
  renderCell: (args: RenderCellEventArgs) => {
    if (
      args.elementType === "emptyCells" &&
      args.element.classList.contains("e-resource-left-td")
    ) {
      let target: HTMLElement = args.element.querySelector(
        ".e-resource-text"
      ) as HTMLElement;
      target.innerHTML = '<div class="name">Name</div>';
    }
  },
});

scheduleObj.appendTo("#Schedule");
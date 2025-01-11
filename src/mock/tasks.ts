import { Task } from "../models/task";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed molestie cursus maximus.",
    status: "Em progresso",
    priority: "Alta",
    createdAt: new Date("1901-04-23T18:25:43.511Z").getTime(),
    responsible: "Lucas",
    deadline: new Date("2001-04-23T18:25:43.511Z").getTime(),
  },
  {
    id: 2,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo.",
    status: "Em progresso",
    priority: "Média",
    createdAt: new Date("1902-04-23T18:25:43.511Z").getTime(),
    responsible: "Maria",
    deadline: new Date("2002-04-23T18:25:43.511Z").getTime(),
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo.",
    status: "Concluída",
    priority: "Baixa",
    createdAt: new Date("1903-04-23T18:25:43.511Z").getTime(),
    responsible: "João",
    deadline: new Date("2003-04-23T18:25:43.511Z").getTime(),
  },
  {
    id: 4,
    title: "Lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo.",
    status: "Pendente",
    priority: "Alta",
    createdAt: new Date("1904-04-23T18:25:43.511Z").getTime(),
    responsible: "Lucas",
    deadline: new Date("2004-04-23T18:25:43.511Z").getTime(),
  },
  {
    id: 5,
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed molestie cursus maximus.",
    status: "Pendente",
    priority: "Média",
    createdAt: new Date("1905-04-23T18:25:43.511Z").getTime(),
    responsible: "Maria",
    deadline: new Date("2005-04-23T18:25:43.511Z").getTime(),
  },
  {
    id: 6,
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo.",
    status: "Concluída",
    priority: "Baixa",
    createdAt: new Date("1906-04-23T18:25:43.511Z").getTime(),
    responsible: "João",
    deadline: new Date("2006-04-23T18:25:43.511Z").getTime(),
  },
  {
    id: 7,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo.",
    status: "Em progresso",
    priority: "Alta",
    createdAt: new Date("1907-04-23T18:25:43.511Z").getTime(),
    responsible: "Lucas",
    deadline: new Date("2007-04-23T18:25:43.511Z").getTime(),
  },
  {
    id: 8,
    title: "Lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo.",
    status: "Concluída",
    priority: "Média",
    createdAt: new Date("1908-04-23T18:25:43.511Z").getTime(),
    responsible: "Maria",
    deadline: new Date("2008-04-23T18:25:43.511Z").getTime(),
  },
  {
    id: 9,
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget erat justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed molestie cursus maximus. ",
    status: "Concluída",
    priority: "Baixa",
    createdAt: new Date("1909-04-23T18:25:43.511Z").getTime(),
    responsible: "João",
    deadline: new Date("2009-04-23T18:25:43.511Z").getTime(),
  },
];

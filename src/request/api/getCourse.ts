import service from "@/request";

interface getRoleData {
  username: string;
  password: string;
}

export function getCourse(auth: getRoleData) {
  return service({
    url: "course/courseList",
    method: "get",
    auth,
  });
}

export function getCourseById(param: any) {
  return service({
    url: "course/courseInfo",
    method: "get",
    params: param,
  });
}

export function getChapterByCourseId(param: any) {
  return service({
    url: "course/chapterList",
    method: "get",
    params: param,
  });
}

import service from "@/request";

interface getRoleData {
  username: string;
  password: string;
}

export function getUser(auth: getRoleData) {
  return service({
    url: "user/userList",
    method: "get",
    auth,
  });
}

export function delUser(param: any) {
  return service({
    url: "user/delete",
    method: "del",
    params: param,
  });
}

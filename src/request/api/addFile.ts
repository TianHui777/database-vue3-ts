import service from "@/request";

export function addFile(params: any, file: any) {
  return service({
    url: "file/add",
    method: "post",
    params: params,
    data: file,
  });
}

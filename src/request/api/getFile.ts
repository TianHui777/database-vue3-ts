import service from "@/request";

export function getFile(params: any) {
  return service({
    url: "file/fileList",
    method: "get",
    params: params,
  });
}

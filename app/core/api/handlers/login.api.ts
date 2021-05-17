export function queryLogin(
  params?: queryTestInfoUsingGET.Params,
  options?: RequestOptions
): Promise<{ errorCode: string; errorMessage: string; success: boolean }> {
  return $api.request('/restttl/dologin', params, options)
}

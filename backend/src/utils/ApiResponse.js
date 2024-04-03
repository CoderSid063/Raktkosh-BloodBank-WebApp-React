class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    (this.statusCode = statusCode),
      (ths.data = data),
      (this.message = message),
      (this.success = statusCode < 400);
  }
}

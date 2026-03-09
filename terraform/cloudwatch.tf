resource "aws_cloudwatch_log_group" "api" {
  name              = "/ecs/${local.prefix}-api"
  retention_in_days = 7

  tags = {
    Name = "${local.prefix}-api-logs"
  }
}

resource "aws_cloudwatch_log_group" "web" {
  name              = "/ecs/${local.prefix}-web"
  retention_in_days = 7

  tags = {
    Name = "${local.prefix}-web-logs"
  }
}

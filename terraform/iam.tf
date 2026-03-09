data "aws_iam_policy_document" "ecs_execution_assume_role" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_execution" {
  name        = "${local.prefix}-ecs-execution-role"
  description = "ECS task execution role for ${local.prefix}"
  assume_role_policy = data.aws_iam_policy_document.ecs_execution_assume_role.json
  tags = {
    Name = "${local.prefix}-ecs-execution-role"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_execution_managed" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}


data "aws_iam_policy_document" "ecs_execution_s3_env" {
  statement {
    effect  = "Allow"
    actions = ["s3:GetObject"]
    resources = [
      "${aws_s3_bucket.api.arn}/env/api_file_env.env",
      "${aws_s3_bucket.api.arn}/env/web_file_env.env",
    ]
  }
}

resource "aws_iam_role_policy" "ecs_execution_s3_env" {
  name = "${local.prefix}-ecs-execution-s3-env"
  role = aws_iam_role.ecs_execution.id
  policy = data.aws_iam_policy_document.ecs_execution_s3_env.json
}


data "aws_iam_policy_document" "ecs_task_assume_role" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_task" {
  name        = "${local.prefix}-ecs-task-role"
  description = "ECS task role for ${local.prefix} API containers"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume_role.json
  tags = {
    Name = "${local.prefix}-ecs-task-role"
  }
}


data "aws_iam_policy_document" "ecs_task_s3_uploads" {
  statement {
    effect = "Allow"
    actions = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.api.arn}/uploads/*"]
  }
}

resource "aws_iam_role_policy" "ecs_task_s3_uploads" {
  name = "${local.prefix}-ecs-task-s3-uploads"
  role = aws_iam_role.ecs_task.id
  policy = data.aws_iam_policy_document.ecs_task_s3_uploads.json
}

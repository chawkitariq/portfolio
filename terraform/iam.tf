data "aws_iam_policy_document" "ecs_execution_assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# ── API execution role ────────────────────────────────────────────────────────

resource "aws_iam_role" "ecs_execution_api" {
  name               = "${local.prefix}-ecs-execution-api-role"
  description        = "ECS task execution role for ${local.prefix} API"
  assume_role_policy = data.aws_iam_policy_document.ecs_execution_assume_role.json
  tags = {
    Name = "${local.prefix}-ecs-execution-api-role"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_execution_api_managed" {
  role       = aws_iam_role.ecs_execution_api.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "ecs_execution_api_s3_env" {
  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.api.arn}/env/api_file_env.env"]
  }
  statement {
    effect    = "Allow"
    actions   = ["s3:GetBucketLocation"]
    resources = [aws_s3_bucket.api.arn]
  }
}

resource "aws_iam_role_policy" "ecs_execution_api_s3_env" {
  name   = "${local.prefix}-ecs-execution-api-s3-env"
  role   = aws_iam_role.ecs_execution_api.id
  policy = data.aws_iam_policy_document.ecs_execution_api_s3_env.json
}

# ── Web execution role ────────────────────────────────────────────────────────

resource "aws_iam_role" "ecs_execution_web" {
  name               = "${local.prefix}-ecs-execution-web-role"
  description        = "ECS task execution role for ${local.prefix} web"
  assume_role_policy = data.aws_iam_policy_document.ecs_execution_assume_role.json
  tags = {
    Name = "${local.prefix}-ecs-execution-web-role"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_execution_web_managed" {
  role       = aws_iam_role.ecs_execution_web.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "ecs_execution_web_s3_env" {
  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.api.arn}/env/web_file_env.env"]
  }
  statement {
    effect    = "Allow"
    actions   = ["s3:GetBucketLocation"]
    resources = [aws_s3_bucket.api.arn]
  }
}

resource "aws_iam_role_policy" "ecs_execution_web_s3_env" {
  name   = "${local.prefix}-ecs-execution-web-s3-env"
  role   = aws_iam_role.ecs_execution_web.id
  policy = data.aws_iam_policy_document.ecs_execution_web_s3_env.json
}

# ── API task role ─────────────────────────────────────────────────────────────

data "aws_iam_policy_document" "ecs_task_assume_role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_task_api" {
  name               = "${local.prefix}-ecs-task-api-role"
  description        = "ECS task role for ${local.prefix} API containers"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume_role.json
  tags = {
    Name = "${local.prefix}-ecs-task-api-role"
  }
}

data "aws_iam_policy_document" "ecs_task_s3_uploads" {
  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.api.arn}/uploads/*"]
  }
}

resource "aws_iam_role_policy" "ecs_task_api_s3_uploads" {
  name   = "${local.prefix}-ecs-task-api-s3-uploads"
  role   = aws_iam_role.ecs_task_api.id
  policy = data.aws_iam_policy_document.ecs_task_s3_uploads.json
}

# ── Web task role ─────────────────────────────────────────────────────────────

resource "aws_iam_role" "ecs_task_web" {
  name               = "${local.prefix}-ecs-task-web-role"
  description        = "ECS task role for ${local.prefix} web containers"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume_role.json
  tags = {
    Name = "${local.prefix}-ecs-task-web-role"
  }
}

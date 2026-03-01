resource "aws_iam_role" "ecs_execution" {
  name        = "${local.prefix}-ecs-execution-role"
  description = "ECS task execution role for ${local.prefix}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = {
    Name = "${local.prefix}-ecs-execution-role"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_execution_managed" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy" "ecs_execution_s3_env" {
  name = "${local.prefix}-ecs-execution-s3-env"
  role = aws_iam_role.ecs_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject"]
      Resource = ["${aws_s3_bucket.api.arn}/file_env.env"]
    }]
  })
}

resource "aws_iam_role" "ecs_task" {
  name        = "${local.prefix}-ecs-task-role"
  description = "ECS task role for ${local.prefix} API containers"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = {
    Name = "${local.prefix}-ecs-task-role"
  }
}

resource "aws_iam_role_policy" "ecs_task_s3_uploads" {
  name = "${local.prefix}-ecs-task-s3-uploads"
  role = aws_iam_role.ecs_task.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
      Resource = ["${aws_s3_bucket.api.arn}/uploads/*"]
    }]
  })
}

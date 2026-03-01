data "aws_ecr_lifecycle_policy_document" "keep_last_10" {
  rule {
    priority    = 1
    description = "Keep last 10 images"

    selection {
      tag_status   = "any"
      count_type   = "imageCountMoreThan"
      count_number = 10
    }

    action {
      type = "expire"
    }
  }
}

resource "aws_ecr_repository" "api" {
  name                 = "${local.prefix}-api"
  image_tag_mutability = "MUTABLE"
  force_delete = true

  tags = {
    Name = "${local.prefix}-api"
  }
}

resource "aws_ecr_lifecycle_policy" "api" {
  repository = aws_ecr_repository.api.name
  policy     = data.aws_ecr_lifecycle_policy_document.keep_last_10.json
}

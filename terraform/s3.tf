resource "aws_s3_bucket" "api" {
  bucket = "${local.prefix}-api"

  tags = {
    Name = "${local.prefix}-api"
  }
}

resource "aws_s3_object" "uploads" {
  bucket  = aws_s3_bucket.api.id
  key     = "uploads/"
  content = ""
}

resource "aws_s3_bucket_public_access_block" "api" {
  bucket = aws_s3_bucket.api.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

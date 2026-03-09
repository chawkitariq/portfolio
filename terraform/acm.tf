resource "aws_acm_certificate" "main" {
  domain_name               = local.web_fqdn
  subject_alternative_names = [local.api_fqdn]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${local.prefix}-cert"
  }
}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

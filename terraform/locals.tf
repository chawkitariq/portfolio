locals {
  prefix = "${var.project_name}-${var.environment}"

  web_fqdn = "${var.web_subdomain}.${var.route53_zone_name}"
  api_fqdn = "${var.api_subdomain}.${var.web_subdomain}.${var.route53_zone_name}"

  default_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

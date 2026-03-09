output "ecr_main_repository_url" {
  description = "ECR repository URL for the main repository. Push images with tag 'latest'."
  value       = aws_ecr_repository.main.repository_url
}

output "web_url" {
  description = "Public URL of the web frontend."
  value       = "https://${local.web_fqdn}"
}

output "api_url" {
  description = "Public URL of the API."
  value       = "https://${local.api_fqdn}"
}

output "alb_dns_name" {
  description = "DNS name of the shared Application Load Balancer."
  value       = aws_lb.main.dns_name
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster."
  value       = aws_ecs_cluster.main.name
}

output "ecs_api_service_name" {
  description = "Name of the API ECS service."
  value       = aws_ecs_service.api.name
}

output "ecs_web_service_name" {
  description = "Name of the web ECS service."
  value       = aws_ecs_service.web.name
}

output "rds_endpoint" {
  description = "RDS instance endpoint (host:port)."
  value       = "${aws_db_instance.main.address}:${aws_db_instance.main.port}"
}

output "rds_db_name" {
  description = "Name of the PostgreSQL database."
  value       = aws_db_instance.main.db_name
}

output "s3_bucket_name" {
  description = "S3 bucket name used for uploads and ECS env files."
  value       = aws_s3_bucket.api.bucket
}

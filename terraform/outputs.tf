output "ecr_repository_url" {
  description = "ECR repository URL. Push images with tag 'api-latest'."
  value       = aws_ecr_repository.api.repository_url
}

output "api_url" {
  description = "Public URL of the API."
  value       = "https://${local.api_fqdn}"
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer."
  value       = aws_lb.api.dns_name
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster."
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "Name of the ECS service."
  value       = aws_ecs_service.api.name
}

output "rds_endpoint" {
  description = "RDS instance endpoint (host:port)."
  value       = "${aws_db_instance.main.address}:${aws_db_instance.main.port}"
  sensitive   = true
}

output "rds_db_name" {
  description = "Name of the PostgreSQL database."
  value       = aws_db_instance.main.db_name
}

output "s3_bucket_name" {
  description = "S3 bucket name used for uploads and the ECS env file."
  value       = aws_s3_bucket.api.bucket
}


output "ecr_repository" {
  description = "ECR repository URL for the main repository. Push images with tag 'latest'."
  value       = aws_ecr_repository.main.repository_url
}

output "ecs_cluster" {
  description = "Name of the ECS cluster."
  value       = aws_ecs_cluster.main.name
}

output "ecs_api_service" {
  description = "Name of the API ECS service."
  value       = aws_ecs_service.api.name
}

output "ecs_web_service" {
  description = "Name of the web ECS service."
  value       = aws_ecs_service.web.name
}

output "api_image_tag" {
  description = "Tag of the API image being deployed."
  value       = var.api_image_tag
}

output "web_image_tag" {
  description = "Tag of the web image being deployed."
  value       = var.web_image_tag
}
variable "project_name" {
  description = "Name of the project. Used in every resource name and tag."
  type        = string
  default     = "portfolio"
}

variable "environment" {
  description = "Deployment environment (e.g. prod, staging, dev)."
  type        = string
  default     = "prod"
}

variable "aws_region" {
  description = "AWS region to deploy resources into."
  type        = string
  default     = "eu-west-3"
}

variable "vpc_id" {
  description = "ID of the existing VPC to deploy into."
  type        = string
}

variable "public_subnet_ids" {
  description = "IDs of existing public subnets (at least 2, one per AZ). Used by the ALB."
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "IDs of existing private subnets (at least 2, one per AZ). Used by ECS tasks and RDS."
  type        = list(string)
}

variable "route53_zone_name" {
  description = "Existing Route 53 hosted zone name (e.g. example.com)."
  type        = string
  default = "chawkitariq.fr"
}

variable "api_subdomain" {
  description = "Subdomain for the API (e.g. api → api.portfolio.example.com)."
  type        = string
  default     = "api"
}

variable "web_subdomain" {
  description = "Subdomain for the web frontend (e.g. portfolio → portfolio.example.com)."
  type        = string
  default     = "portfolio"
}

variable "service_desired_count" {
  description = "Desired number of ECS task instances."
  type        = number
  default     = 1
}

variable "db_name" {
  description = "Name of the PostgreSQL database."
  type        = string
  default     = "portfolio"
}

variable "db_username" {
  description = "Master username for the RDS instance."
  type        = string
  default     = "portfolio"
}

variable "db_password" {
  description = "Master password for the RDS instance."
  type        = string
  sensitive   = true
}

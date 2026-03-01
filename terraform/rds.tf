resource "aws_db_subnet_group" "main" {
  name        = "${local.prefix}-db-subnet-group"
  description = "Private subnets for ${local.prefix} RDS instance"
  subnet_ids  = var.private_subnet_ids

  tags = {
    Name = "${local.prefix}-db-subnet-group"
  }
}

resource "aws_db_parameter_group" "main" {
  name        = "${var.project_name}-rds-pg"
  family      = "postgres17"
  description = "PostgreSQL parameter group"
}

resource "aws_db_instance" "main" {
  identifier = "${local.prefix}-db"
  engine         = "postgres"
  engine_version = "17.2"
  instance_class = "db.t3.medium"
  storage_type      = "gp3"
  allocated_storage = 20
  storage_encrypted = true
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  multi_az = false
  backup_retention_period = 7
  deletion_protection = false
  skip_final_snapshot = true
  parameter_group_name = aws_db_parameter_group.main.name

  tags = {
    Name = "${local.prefix}-db"
  }
}



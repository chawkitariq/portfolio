resource "aws_db_subnet_group" "main" {
  name        = "${local.prefix}-db-subnet-group"
  description = "Private subnets for ${local.prefix} RDS instance"
  subnet_ids  = var.private_subnet_ids

  tags = {
    Name = "${local.prefix}-db-subnet-group"
  }
}

resource "random_password" "db" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}:?"
}

resource "aws_db_instance" "main" {
  identifier = "${local.prefix}-db"

  engine         = "postgres"
  engine_version = "17"
  instance_class = "db.t4g.micro"

  storage_type      = "gp3"
  allocated_storage = 20
  storage_encrypted = true

  db_name  = var.db_name
  username = var.db_username
  password = random_password.db.result

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false

  parameter_group_name = "default.postgres17"

  multi_az = false

  backup_retention_period = 7

  deletion_protection = false
  skip_final_snapshot = true

  tags = {
    Name = "${local.prefix}-db"
  }
}



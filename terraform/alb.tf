resource "aws_lb" "main" {
  name                       = "${local.prefix}-alb"
  load_balancer_type         = "application"
  internal                   = false
  security_groups            = [aws_security_group.alb.id]
  subnets                    = var.public_subnet_ids
  enable_deletion_protection = false

  tags = {
    Name = "${local.prefix}-alb"
  }
}

# ── API ───────────────────────────────────────────────────────────────────────

resource "aws_lb_target_group" "api" {
  name        = "${local.prefix}-tg-api"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path                = "/health"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
  }

  tags = {
    Name = "${local.prefix}-tg-api"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# ── WEB ───────────────────────────────────────────────────────────────────────

resource "aws_lb_target_group" "web" {
  name        = "${local.prefix}-tg-web"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path                = "/"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
  }

  tags = {
    Name = "${local.prefix}-tg-web"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# ── Listeners ─────────────────────────────────────────────────────────────────

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate_validation.main.certificate_arn

  # Default: forward to web frontend
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web.arn
  }
}

# ── Listener rules ────────────────────────────────────────────────────────────

resource "aws_lb_listener_rule" "api" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 10

  condition {
    host_header {
      values = [local.api_fqdn]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }
}

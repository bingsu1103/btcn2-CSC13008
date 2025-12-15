import { Link } from "react-router-dom";
import { ShieldAlert, Home, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Unauthorized = () => {
  return (
    <div className="mt-15 flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-lg">
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-muted/60 blur-3xl" />

          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-destructive/10 flex items-center justify-center">
                <ShieldAlert className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-2xl">401 — Unauthorized</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Bạn chưa có quyền truy cập trang này hoặc phiên đăng nhập đã
                  hết hạn.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                Gợi ý: hãy đăng nhập lại hoặc quay về trang chủ.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button asChild variant="secondary" className="gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Về trang chủ
                </Link>
              </Button>

              <Button asChild className="gap-2">
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  Đăng nhập
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Nếu bạn nghĩ đây là lỗi, hãy liên hệ admin hoặc kiểm tra lại
              token/quyền truy cập.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Unauthorized;

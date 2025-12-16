import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import apiUser from "@/services/apiUser";
import { useAuth } from "@/contexts/AuthContext";

const updateSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  dob: z.string().nonempty("Vui lòng chọn ngày sinh"),
});

const UserProfile = () => {
  const { user, isAuthLoading } = useAuth();
  const form = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      email: user.email || "",
      phone: user.phone || "",
      dob: user.dob || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await apiUser.updateUser(values);
      toast.success("Cập nhật thông tin thành công");
    } catch (e) {
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Thông tin readonly */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">User ID</p>
              <p className="font-medium">{user.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Role</p>
              <p className="font-medium capitalize">{user.role}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Username</p>
              <p className="font-medium">{user.username}</p>
            </div>
          </div>

          {/* Form update */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Update profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;

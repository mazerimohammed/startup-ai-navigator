
import React, { useState } from "react";
import { useCompany } from "@/context/CompanyContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Role, RoleCategory } from "@/types";
import { nanoid } from "@/lib/utils";
import { Plus } from "lucide-react";

type FormInputs = {
  title: string;
  description: string;
  category: RoleCategory;
  responsibility1: string;
  responsibility2: string;
};

const categoryIcons: Record<RoleCategory, string> = {
  tech: 'code',
  marketing: 'brain',
  finance: 'chart-bar',
  operations: 'settings',
  hr: 'users',
  leadership: 'trophy'
};

const categoryOptions: {value: RoleCategory; label: string}[] = [
  { value: 'tech', label: 'Technology' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance' },
  { value: 'operations', label: 'Operations' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'leadership', label: 'Leadership' }
];

const AddTeamMember = () => {
  const { addCustomRole } = useCompany();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();
  const [selectedCategory, setSelectedCategory] = useState<RoleCategory>('tech');

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newRole: Role = {
      id: nanoid(),
      title: data.title,
      description: data.description,
      category: data.category,
      responsibilities: [
        data.responsibility1,
        data.responsibility2,
        `Provide expert advice on ${data.title} matters`,
        `Help optimize ${data.category} strategies and processes`
      ],
      icon: categoryIcons[data.category]
    };

    addCustomRole(newRole);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Custom Team Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new AI team member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Role Title</Label>
            <Input
              id="title"
              placeholder="e.g. Product Manager, UX Designer, etc."
              {...register("title", { required: "Role title is required" })}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              defaultValue={selectedCategory} 
              onValueChange={(value: RoleCategory) => {
                setSelectedCategory(value);
                // @ts-ignore - This is a valid way to set form values
                register("category").onChange({ target: { name: "category", value } });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" {...register("category", { required: true })} value={selectedCategory} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Role Description</Label>
            <Textarea
              id="description"
              placeholder="What does this team member do?"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibility1">Key Responsibility 1</Label>
            <Input
              id="responsibility1"
              placeholder="e.g. Design user interfaces"
              {...register("responsibility1", { required: "At least one responsibility is required" })}
            />
            {errors.responsibility1 && (
              <p className="text-sm text-destructive">{errors.responsibility1.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibility2">Key Responsibility 2</Label>
            <Input
              id="responsibility2"
              placeholder="e.g. Conduct user research"
              {...register("responsibility2", { required: "Second responsibility is required" })}
            />
            {errors.responsibility2 && (
              <p className="text-sm text-destructive">{errors.responsibility2.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">Add to Team</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMember;

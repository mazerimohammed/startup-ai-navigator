
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompany } from "@/context/CompanyContext";
import { companyTypes } from "@/lib/company-types";
import { Company, CompanyType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";

const CompanySetup = () => {
  const [companyName, setCompanyName] = useState("");
  const [selectedType, setSelectedType] = useState<CompanyType | null>(null);
  const [nameError, setNameError] = useState("");
  const [typeError, setTypeError] = useState("");
  const { setCompany } = useCompany();
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
    if (e.target.value.trim()) {
      setNameError("");
    }
  };

  const handleTypeSelect = (type: CompanyType) => {
    setSelectedType(type);
    setTypeError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    let isValid = true;
    
    if (!companyName.trim()) {
      setNameError("Please enter your company name");
      isValid = false;
    }
    
    if (!selectedType) {
      setTypeError("Please select your company type");
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Create the company object
    const company: Company = {
      name: companyName.trim(),
      type: selectedType as CompanyType
    };
    
    // Set the company in context
    setCompany(company);
    
    // Navigate to team page
    navigate("/team");
  };

  return (
    <Layout>
      <div className="container max-w-5xl py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Tell us about your startup
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            We'll use this information to build your AI-powered team
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Enter your company name"
              value={companyName}
              onChange={handleNameChange}
              className={nameError ? "border-destructive" : ""}
            />
            {nameError && (
              <p className="text-sm text-destructive">{nameError}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Company Type</Label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {companyTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer p-4 transition-all ${
                    selectedType === type.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{type.icon}</div>
                    <div>
                      <h3 className="font-medium">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {typeError && (
              <p className="text-sm text-destructive">{typeError}</p>
            )}
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit" size="lg">
              Build My AI Team
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CompanySetup;

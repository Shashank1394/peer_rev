import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import AuthHeader from "./auth-header";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  title: string;
  showScocial?: boolean;
  backButtonHref: string;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  title,
  showScocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[500px] shadow-md">
      <CardHeader>
        <AuthHeader label={headerLabel} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;

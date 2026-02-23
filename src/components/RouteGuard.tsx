"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const isInitialRouteProtected = pathname ? !!protectedRoutes[pathname as keyof typeof protectedRoutes] : false;

  const [isRouteEnabled, setIsRouteEnabled] = useState(true);
  const [isPasswordRequired, setIsPasswordRequired] = useState(isInitialRouteProtected);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(isInitialRouteProtected);

  useEffect(() => {
    const checkRoute = () => {
      if (!pathname) return false;
      if (pathname in routes) return routes[pathname as keyof typeof routes];

      const dynamicRoutes = ["/blog", "/work"] as const;
      for (const route of dynamicRoutes) {
        if (pathname?.startsWith(route) && routes[route]) return true;
      }
      return false;
    };

    const routeEnabled = checkRoute();
    setIsRouteEnabled(routeEnabled);

    // Reset authentication state for new route navigation
    setIsAuthenticated(false);
    setError(undefined);

    if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
      setIsPasswordRequired(true);
      setLoading(true);
      fetch("/api/check-auth").then((response) => {
        if (response.ok) setIsAuthenticated(true);
        setLoading(false);
      });
    } else {
      setIsPasswordRequired(false);
      setLoading(false);
    }
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };

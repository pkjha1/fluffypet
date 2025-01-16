import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function useUserRole() {
  const { user } = useUser();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetch(`/api/users/${user.id}/role`)
        .then((res) => res.json())
        .then((data) => setRole(data.role))
        .catch((error) => console.error("Error fetching user role:", error));
    }
  }, [user]);

  return role;
}


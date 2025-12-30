import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  console.log("User Profile Data:", user);

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          User Profile
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">{user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{user?.email || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

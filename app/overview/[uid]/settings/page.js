import SettingPage from "@/components/SettingPage";

export default async function Settings() {
  return (
    <div>
      <h1 className="text-5xl mb-6 text-orange-700 ml-4">Settings</h1>
      <div>
        <SettingPage />
      </div>
    </div>
  );
}

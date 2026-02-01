import { useState, useEffect, startTransition } from 'react';
import { Icon } from '@iconify/react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { PageFooter } from '@/components/layout/PageFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useAuthContext } from '@/contexts/auth-utils';
import { useUpdateProfile } from '@/hooks/useAuth';
import { getFormErrorsFromApiResponse } from '@/lib/utils/api-errors';

export const SettingsPage = () => {
  const { user } = useAuthContext();
  const updateProfileMutation = useUpdateProfile();

  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    orgName: user?.org_name ?? '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Reset form when user changes (standard React pattern)
  // Using startTransition to avoid React compiler warning
  useEffect(() => {
    if (user) {
      startTransition(() => {
        setFormData({
          fullname: user.fullname || '',
          email: user.email || '',
          orgName: user.org_name ?? '',
        });
      });
    }
  }, [user, user?.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setFieldErrors({});
    setSuccessMessage('');

    updateProfileMutation.mutate(
      {
        fullname: formData.fullname,
        email: formData.email,
        org_name: formData.orgName || null,
      },
      {
        onSuccess: (response) => {
          if (response.meta.code === 200) {
            setSuccessMessage('Profile updated successfully');
            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
            // Clear any previous errors
            setFieldErrors({});
            setErrorMessage('');
          } else {
            // Handle validation errors (400) or other errors
            const { fieldErrors: errors, generalError } =
              getFormErrorsFromApiResponse(response);
            setFieldErrors(errors);
            setErrorMessage(
              generalError ||
                (Object.keys(errors).length > 0
                  ? 'Please fix the errors below'
                  : response.meta.message ||
                    'Failed to update profile. Please try again.')
            );
          }
        },
        onError: (error: unknown) => {
          const { fieldErrors: errors, generalError } =
            getFormErrorsFromApiResponse(error);
          setFieldErrors(errors);
          setErrorMessage(
            generalError ||
              (Object.keys(errors).length > 0
                ? 'Please fix the errors below'
                : 'Failed to update profile. Please try again.')
          );
        },
      }
    );
  };
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8f8f8] relative">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#aaa 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <Header title="SETTINGS" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b-2 border-black pb-4">
              <h1 className="text-3xl font-bold uppercase tracking-tight">
                System Settings
              </h1>
              <p className="font-mono text-sm text-neutral-600 mt-2">
                Configure your account and preferences.
              </p>
            </div>

            {/* Profile */}
            <Card className="p-6">
              <h2 className="font-bold uppercase text-lg mb-4 flex items-center gap-2">
                <Icon icon="solar:user-circle-linear" />
                Profile Information
              </h2>
              <form
                key={user?.id}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {errorMessage && (
                  <div className="bg-red-50 border-2 border-red-500 p-3 text-xs text-red-700">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="solar:danger-triangle-bold"
                        className="text-base"
                      />
                      <span className="font-bold">{errorMessage}</span>
                    </div>
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-50 border-2 border-green-500 p-3 text-xs text-green-700">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="solar:check-circle-bold"
                        className="text-base"
                      />
                      <span className="font-bold">{successMessage}</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block font-bold text-xs uppercase tracking-wide mb-2">
                    Full Name
                  </label>
                  <Input
                    value={formData.fullname}
                    placeholder="e.g. John System"
                    onChange={(e) =>
                      setFormData({ ...formData, fullname: e.target.value })
                    }
                    required
                  />
                  {fieldErrors.fullname && (
                    <p className="text-xs text-red-600 mt-1">
                      {fieldErrors.fullname}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-bold text-xs uppercase tracking-wide mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="e.g. john@coplannr.xyz"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-600 mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-bold text-xs uppercase tracking-wide mb-2">
                    Company / Organization
                  </label>
                  <Input
                    value={formData.orgName}
                    placeholder="e.g. Coplannr Inc."
                    onChange={(e) =>
                      setFormData({ ...formData, orgName: e.target.value })
                    }
                  />
                  {fieldErrors.org_name && (
                    <p className="text-xs text-red-600 mt-1">
                      {fieldErrors.org_name}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="px-6 py-2"
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="svg-spinners:ring-resize"
                        className="text-lg"
                      />
                      Saving...
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </form>
            </Card>

            {/* Notifications */}
            <Card className="p-6">
              <h2 className="font-bold uppercase text-lg mb-4 flex items-center gap-2">
                <Icon icon="solar:bell-linear" />
                Notifications
              </h2>
              <div className="space-y-3 mb-4">
                {[
                  { label: 'Email me when posts are published', checked: true },
                  { label: 'Email me when posts fail', checked: true },
                  { label: 'Weekly performance summary', checked: true },
                  {
                    label: 'New platform integrations available',
                    checked: false,
                  },
                ].map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center gap-3 border-2 border-transparent cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="w-5 h-5 border-2 border-black appearance-none checked:bg-brand-neon cursor-pointer"
                    />
                    <span className="text-sm">{item.label}</span>
                  </label>
                ))}
              </div>

              <Button className="px-6 py-2">Set Preferences</Button>
            </Card>

            {/* Timezone */}
            {/* <Card className="p-6">
              <h2 className="font-bold uppercase text-lg mb-4 flex items-center gap-2">
                <Icon icon="solar:clock-circle-linear" />
                Timezone & Region
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-xs uppercase tracking-wide mb-2">
                    Timezone
                  </label>
                  <select className="w-full px-4 py-3 border-hard bg-white font-mono text-sm outline-none focus:shadow-[4px_4px_0px_0px_#ccff00]">
                    <option>UTC-08:00 Pacific Time (US & Canada)</option>
                    <option>UTC-05:00 Eastern Time (US & Canada)</option>
                    <option>UTC+00:00 London</option>
                    <option>UTC+01:00 Paris, Berlin</option>
                  </select>
                </div>

                <Button className="px-6 py-2">Confirm</Button>
              </div>
            </Card> */}

            {/* Danger Zone */}
            {/* <Card className="p-6 bg-[#fff5f5] border-brand-red">
              <h2 className="font-bold uppercase text-lg mb-4 flex items-center gap-2 text-brand-red">
                <Icon icon="solar:danger-triangle-linear" />
                Danger Zone
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border-2 border-brand-red">
                  <div>
                    <p className="font-bold text-sm">Delete Account</p>
                    <p className="font-mono text-xs text-neutral-600 mt-1">
                      Permanently delete your account and all data.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    className="px-4 py-2 border-brand-red! text-brand-red! hover:bg-brand-red! hover:text-white!"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card> */}
          </div>

          <PageFooter />
        </div>
      </main>
    </div>
  );
};

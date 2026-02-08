import { useState, useEffect, startTransition } from 'react';
import { Icon } from '@iconify/react';
import { Sidebar } from '@/components/organisms/Sidebar';
import { Header } from '@/components/organisms/Header';
import { PageFooter } from '@/components/organisms/PageFooter';
import { BackgroundGrid } from '@/components/atoms/BackgroundGrid';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/molecules/Alert';
import { FormField } from '@/components/molecules/FormField';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';
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
        <BackgroundGrid opacity={0.2} size={20} />

        <Header title="SETTINGS" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="relative">
              <div className="border-b-2 border-black pb-6">
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-3">
                  Account Settings
                </h1>
                <p className="font-mono text-sm text-neutral-600 max-w-2xl">
                  Manage your profile information and notification preferences.
                </p>
              </div>
            </div>

            {/* Profile */}
            <Card className="p-6 md:p-8 relative overflow-hidden">
              {/* Decorative accent line at top */}
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-red -translate-y-px"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Icon
                    icon="solar:user-circle-linear"
                    className="text-2xl text-black"
                  />
                  <h2 className="font-bold uppercase text-lg">
                    Profile Information
                  </h2>
                </div>

                <form
                  key={user?.id}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {errorMessage && (
                    <Alert variant="error" message={errorMessage} />
                  )}
                  {successMessage && (
                    <Alert variant="success" message={successMessage} />
                  )}

                  {/* Email - First, Disabled */}
                  <FormField
                    label="Email Address"
                    htmlFor="email"
                    required
                    error={fieldErrors.email}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. john@coplannr.xyz"
                      value={formData.email}
                      disabled
                      className="bg-neutral-100 cursor-not-allowed"
                    />
                    <p className="font-mono text-[10px] text-neutral-500 mt-1">
                      Email cannot be changed
                    </p>
                  </FormField>

                  {/* Full Name */}
                  <FormField
                    label="Full Name"
                    htmlFor="fullname"
                    required
                    error={fieldErrors.fullname}
                  >
                    <Input
                      id="fullname"
                      value={formData.fullname}
                      placeholder="e.g. John System"
                      onChange={(e) =>
                        setFormData({ ...formData, fullname: e.target.value })
                      }
                      required
                    />
                  </FormField>

                  {/* Organization */}
                  <FormField
                    label="Company / Organization"
                    htmlFor="orgName"
                    error={fieldErrors.org_name}
                  >
                    <Input
                      id="orgName"
                      value={formData.orgName}
                      placeholder="e.g. Coplannr Inc."
                      onChange={(e) =>
                        setFormData({ ...formData, orgName: e.target.value })
                      }
                    />
                  </FormField>

                  <div className="pt-4 border-t-2 border-dashed border-neutral-200">
                    <Button
                      type="submit"
                      className="px-6 py-3 flex items-center gap-2"
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? (
                        <>
                          <LoadingSpinner size="md" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Icon
                            icon="solar:diskette-linear"
                            className="text-lg"
                          />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-6 md:p-8 relative overflow-hidden">
              {/* Decorative accent line at top */}
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-red -translate-y-px"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Icon
                    icon="solar:bell-linear"
                    className="text-2xl text-black"
                  />
                  <h2 className="font-bold uppercase text-lg">Notifications</h2>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    {
                      label: 'Email me when posts are published',
                      checked: true,
                      icon: 'solar:letter-linear',
                    },
                    {
                      label: 'Email me when posts fail',
                      checked: true,
                      icon: 'solar:danger-triangle-linear',
                    },
                    {
                      label: 'Weekly performance summary',
                      checked: true,
                      icon: 'solar:chart-2-linear',
                    },
                    {
                      label: 'New platform integrations available',
                      checked: false,
                      icon: 'solar:link-circle-linear',
                    },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className="flex items-center gap-3 p-3 border-2 border-black bg-white hover:bg-brand-neon/10 hover:shadow-hard-sm hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-5 h-5 border-2 border-black appearance-none checked:bg-brand-neon cursor-pointer"
                      />
                      <Icon
                        icon={item.icon}
                        className="text-lg text-neutral-500 group-hover:text-black transition-colors"
                      />
                      <span className="text-sm flex-1">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-4 border-t-2 border-dashed border-neutral-200">
                  <Button className="px-6 py-3 flex items-center gap-2">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="text-lg"
                    />
                    Set Preferences
                  </Button>
                </div>
              </div>
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

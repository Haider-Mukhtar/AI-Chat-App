// Simple, fully-open permissions for development:
// - Everyone can read/write $users.
// You can tighten this later based on your auth model.
export const perms = {
  $users: {
    read: true,
    write: true,
  },
};

export default perms;

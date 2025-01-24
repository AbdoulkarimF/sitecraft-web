import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogEditor from '../components/blog/BlogEditor';
import { AuthProvider } from '../contexts/AuthContext';

// Mock de react-quill
jest.mock('react-quill', () => ({
  __esModule: true,
  default: () => <div data-testid="quill-editor" />,
}));

// Mock du contexte d'authentification
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    currentUser: {
      token: 'fake-token',
    },
  }),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

describe('BlogEditor Component', () => {
  const mockPost = {
    id: '123',
    title: 'Test Post',
    content: 'Test Content',
    categories: ['Tech'],
    tags: ['React'],
    status: 'draft',
  };

  beforeEach(() => {
    // Mock fetch pour les appels API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPost),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(
      <AuthProvider>
        <BlogEditor postId={mockPost.id} />
      </AuthProvider>
    );
  });

  test('loads initial post data', async () => {
    render(
      <AuthProvider>
        <BlogEditor postId={mockPost.id} />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
    });
  });

  test('updates title', async () => {
    render(
      <AuthProvider>
        <BlogEditor postId={mockPost.id} />
      </AuthProvider>
    );

    const titleInput = await screen.findByDisplayValue(mockPost.title);
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/posts/${mockPost.id}`,
        expect.any(Object)
      );
    });
  });

  test('adds category', async () => {
    render(
      <AuthProvider>
        <BlogEditor postId={mockPost.id} />
      </AuthProvider>
    );

    const categoryInput = screen.getByPlaceholderText(/nouvelle catégorie/i);
    fireEvent.change(categoryInput, { target: { value: 'New Category' } });
    fireEvent.submit(categoryInput.closest('form'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/posts/${mockPost.id}`,
        expect.any(Object)
      );
    });
  });

  test('adds tag', async () => {
    render(
      <AuthProvider>
        <BlogEditor postId={mockPost.id} />
      </AuthProvider>
    );

    const tagInput = screen.getByPlaceholderText(/nouveau tag/i);
    fireEvent.change(tagInput, { target: { value: 'New Tag' } });
    fireEvent.submit(tagInput.closest('form'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/posts/${mockPost.id}`,
        expect.any(Object)
      );
    });
  });

  test('publishes post', async () => {
    render(
      <AuthProvider>
        <BlogEditor postId={mockPost.id} />
      </AuthProvider>
    );

    const publishButton = screen.getByText(/publier/i);
    fireEvent.click(publishButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/posts/${mockPost.id}/publish`,
        expect.any(Object)
      );
    });
  });

  test('shows preview', () => {
    render(
      <AuthProvider>
        <BlogEditor postId={mockPost.id} />
      </AuthProvider>
    );

    const previewButton = screen.getByText(/aperçu/i);
    fireEvent.click(previewButton);

    expect(screen.getByTestId('preview-mode')).toBeInTheDocument();
  });

  test('autosaves content', async () => {
    jest.useFakeTimers();

    render(
      <AuthProvider>
        <BlogEditor postId={mockPost.id} />
      </AuthProvider>
    );

    const editor = screen.getByTestId('quill-editor');
    fireEvent.change(editor, { target: { value: 'New content' } });

    // Avancer le temps pour déclencher l'autosave
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/posts/${mockPost.id}`,
        expect.any(Object)
      );
    });

    jest.useRealTimers();
  });
});

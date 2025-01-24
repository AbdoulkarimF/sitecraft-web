import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SiteEditor from '../components/editor/SiteEditor';
import { AuthProvider } from '../contexts/AuthContext';

// Mock des composants et hooks externes
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => children,
  Droppable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }),
  Draggable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }),
}));

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    currentUser: {
      token: 'fake-token',
    },
  }),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

describe('SiteEditor Component', () => {
  const mockSiteId = '123';
  const mockSections = [
    {
      id: '1',
      type: 'hero',
      content: {
        title: 'Test Hero',
        subtitle: 'Test Subtitle',
      },
      styles: {
        backgroundColor: 'bg-white',
      },
    },
  ];

  beforeEach(() => {
    // Mock fetch pour les appels API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ sections: mockSections }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(
      <AuthProvider>
        <SiteEditor siteId={mockSiteId} />
      </AuthProvider>
    );
  });

  test('loads initial site data', async () => {
    render(
      <AuthProvider>
        <SiteEditor siteId={mockSiteId} />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`/api/sites/${mockSiteId}`);
    });
  });

  test('adds new section', async () => {
    render(
      <AuthProvider>
        <SiteEditor siteId={mockSiteId} />
      </AuthProvider>
    );

    // Simuler l'ajout d'une section
    const addButton = screen.getByText(/ajouter/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/sites/${mockSiteId}`,
        expect.any(Object)
      );
    });
  });

  test('deletes section', async () => {
    render(
      <AuthProvider>
        <SiteEditor siteId={mockSiteId} />
      </AuthProvider>
    );

    // Simuler la suppression d'une section
    const deleteButton = screen.getByTitle('Supprimer');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/sites/${mockSiteId}`,
        expect.any(Object)
      );
    });
  });

  test('autosaves changes', async () => {
    jest.useFakeTimers();

    render(
      <AuthProvider>
        <SiteEditor siteId={mockSiteId} />
      </AuthProvider>
    );

    // Simuler une modification
    const editButton = screen.getByTitle('Éditer');
    fireEvent.click(editButton);

    // Avancer le temps pour déclencher l'autosave
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `/api/sites/${mockSiteId}`,
        expect.any(Object)
      );
    });

    jest.useRealTimers();
  });

  test('toggles preview mode', () => {
    render(
      <AuthProvider>
        <SiteEditor siteId={mockSiteId} />
      </AuthProvider>
    );

    const previewButton = screen.getByText(/aperçu/i);
    fireEvent.click(previewButton);

    expect(screen.getByText(/aperçu/i)).toHaveClass('bg-indigo-600');
  });
});

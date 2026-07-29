import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '`@vue/test-utils`';
import Dropzone from '../src/runtime/Dropzone.vue';

describe('Dropzone', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe('props', () => {
    it('should render with default props', () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
        },
      });

      expect(wrapper.find('input').attributes('id')).toBe('test-dropzone');
      expect(wrapper.find('label').text()).toBe('Select File');
    });

    it('should render with custom label', () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          label: 'Custom Label',
        },
      });

      expect(wrapper.find('label').text()).toBe('Custom Label');
    });

    it('should render with multiple attribute', () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          multiple: true,
        },
      });

      expect(wrapper.find('input').attributes('multiple')).toBeDefined();
    });

    it('should render with accept attribute', () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          accept: 'image/*',
        },
      });

      expect(wrapper.find('input').attributes('accept')).toBe('image/*');
    });

    it('should render with array accept attribute', () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          accept: ['image/jpeg', 'image/png'],
        },
      });

      expect(wrapper.find('input').attributes('accept')).toBe('image/jpeg,image/png');
    });

    it('should render error messages when provided', () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          errorMessages: 'File is required',
        },
      });

      expect(wrapper.find('.messages__message').text()).toBe('File is required');
    });
  });

  describe('events', () => {
    it('should emit update:modelValue when file is selected', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
        },
      });

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const input = wrapper.find('input');

      // Create a mock FileList
      const mockFileList = {
        0: file,
        1: null,
        length: 1,
        item: (index: number) => (index === 0 ? file : null),
      } as unknown as FileList;

      Object.defineProperty(input.element, 'files', {
        value: mockFileList,
        writable: false,
      });

      await input.trigger('change');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });

    it('should emit change event when file is selected', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
        },
      });

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const input = wrapper.find('input');

      // Create a mock FileList
      const mockFileList = {
        0: file,
        1: null,
        length: 1,
        item: (index: number) => (index === 0 ? file : null),
      } as unknown as FileList;

      Object.defineProperty(input.element, 'files', {
        value: mockFileList,
        writable: false,
      });

      await input.trigger('change');

      expect(wrapper.emitted('change')).toBeTruthy();
    });

    it('should emit update:modelValue when file is dropped', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
        },
      });

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const dropzone = wrapper.find('.dropzone');

      await dropzone.trigger('dragenter', {
        dataTransfer: {
          files: [file],
        },
      });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });

    it('should emit change event when file is dropped', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
        },
      });

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const dropzone = wrapper.find('.dropzone');

      await dropzone.trigger('dragenter', {
        dataTransfer: {
          files: [file],
        },
      });

      expect(wrapper.emitted('change')).toBeTruthy();
    });
  });

  describe('multiple files', () => {
    it('should handle multiple files when multiple is true', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          multiple: true,
        },
      });

      const files = [
        new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
        new File(['test2'], 'test2.jpg', { type: 'image/jpeg' }),
      ];
      const input = wrapper.find('input');

      // Create a mock FileList
      const mockFileList = {
        0: files[0],
        1: files[1],
        2: null,
        length: 2,
        item: (index: number) => files[index] || null,
      } as unknown as FileList;

      Object.defineProperty(input.element, 'files', {
        value: mockFileList,
        writable: false,
      });

      await input.trigger('change');

      const emitted = wrapper.emitted('update:modelValue');
      expect(emitted).toBeTruthy();
      expect(Array.isArray(emitted![0][0])).toBe(true);
    });

    it('should handle single file when multiple is false', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          multiple: false,
        },
      });

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const input = wrapper.find('input');

      // Create a mock FileList
      const mockFileList = {
        0: file,
        1: null,
        length: 1,
        item: (index: number) => (index === 0 ? file : null),
      } as unknown as FileList;

      Object.defineProperty(input.element, 'files', {
        value: mockFileList,
        writable: false,
      });

      await input.trigger('change');

      const emitted = wrapper.emitted('update:modelValue');
      expect(emitted).toBeTruthy();
      expect(Array.isArray(emitted![0][0])).toBe(false);
    });
  });

  describe('exposed methods', () => {
    it('should expose addFile method', () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
        },
      });

      expect(wrapper.vm.addFile).toBeDefined();
    });

    it('should expose clearFile method', () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
        },
      });

      expect(wrapper.vm.clearFile).toBeDefined();
    });

    it('should clear file when clearFile is called', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          modelValue: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
        },
      });

      await wrapper.vm.clearFile();

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBeNull();
    });
  });

  describe('drag and drop', () => {
    it('should add active class on drag enter', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
        },
      });

      const dropzone = wrapper.find('.dropzone');
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      await dropzone.trigger('dragenter', {
        dataTransfer: {
          files: [file],
        },
      });

      expect(dropzone.classes()).toContain('active-dropzone');
    });

    it('should filter files based on accept prop', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          accept: 'image/jpeg',
        },
      });

      const files = [
        new File(['test1'], 'test1.jpg', { type: 'image/jpeg' }),
        new File(['test2'], 'test2.png', { type: 'image/png' }),
      ];
      const dropzone = wrapper.find('.dropzone');

      await dropzone.trigger('dragenter', {
        dataTransfer: {
          files: files,
        },
      });

      const emitted = wrapper.emitted('update:modelValue');
      expect(emitted).toBeTruthy();
    });
  });

  describe('slots', () => {
    it('should render default slot content', () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
        },
        slots: {
          default: '<div class="custom-content">Custom Content</div>',
        },
      });

      expect(wrapper.find('.custom-content').text()).toBe('Custom Content');
    });

    it('should render icon slot content', () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          modelValue: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
        },
        slots: {
          icon: '<div class="custom-icon">Custom Icon</div>',
        },
      });

      expect(wrapper.find('.custom-icon').text()).toBe('Custom Icon');
    });
  });

  describe('modelValue', () => {
    it('should sync with modelValue prop', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
          modelValue: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
        },
      });

      expect(wrapper.vm.dropzoneFile).toBeDefined();
    });

    it('should update when modelValue changes', async () => {
      const wrapper = mount(Dropzone, {
        props: {
          id: 'test-dropzone',
        },
      });

      await wrapper.setProps({
        modelValue: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
      });

      expect(wrapper.vm.dropzoneFile).toBeDefined();
    });
  });
});

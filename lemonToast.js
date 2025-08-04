const ToastPositions = {
    'top-right': 'top-5 right-5 items-end',
    'top-left': 'top-5 left-5 items-start',
    'bottom-right': 'bottom-5 right-5 items-end',
    'bottom-left': 'bottom-5 left-5 items-start',
    'top-center': 'top-5 left-1/2 -translate-x-1/2 items-center',
    'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2 items-center'
};

const ToastTypes = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-700 text-white',
    warning: 'bg-yellow-600 text-white',
    info: 'bg-blue-500 text-white'
};

const ToastTypesOut = {
    success: 'border border-green-500 text-gray-500 bg-white',
    error: 'border border-red-500 text-gray-500 bg-white',
    warning: 'border border-yellow-500 text-gray-500 bg-white',
    info: 'border border-blue-500 text-gray-500 bg-white'
};

const ToastStyles = {
    default: '',
    glass: 'backdrop-blur-md bg-white/30 text-black shadow-md',
    glassDark: 'backdrop-blur-md bg-gray-900/30 text-white shadow-md',
    neumorphic: 'bg-gray-100 shadow-[8px_8px_15px_#ccc,-8px_-8px_15px_#fff] text-black',
    rounded: 'rounded-full px-5 py-3',
    dark: 'bg-gray-900 text-white',
    light: 'bg-white text-black shadow'
};

const ToastCSSAnimations = {
    fade: { in: 'animate-fade', out: 'animate-fade-out' },
    slide: { in: 'animate-slide', out: 'animate-slide-out' },
    bounce: { in: 'animate-bounce', out: 'animate-bounce-out' },
    zoom: { in: 'animate-zoom', out: 'animate-zoom-out' },
    flip: { in: 'animate-flip', out: 'animate-flip-out' }
};

class ToastManager {
    constructor() {
        this.containerMap = new Map();
        this.theme = this.detectTheme();
    }

    detectTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    createContainer(position) {
        if (this.containerMap.has(position)) return this.containerMap.get(position);
        const div = document.createElement('div');
        div.className = `toast-container fixed z-50 flex flex-col gap-3 pointer-events-none ${ToastPositions[position] || ToastPositions['top-right']}`;
        document.body.appendChild(div);
        this.containerMap.set(position, div);
        return div;
    }

    show(options) {
        const {
            title = '', message = '', type = 'info', icon = '', rtl = false, duration = 4000,
            position = 'top-right', style = 'default', theme = 'light', progress = false, typeStyle = 'outline',
            action = null, onShow = null, onClose = null, animation = 'fade', showCloseButton = false
        } = options;

        const container = this.createContainer(position);
        const toast = document.createElement('div');
        toast.setAttribute('dir', rtl ? 'rtl' : 'ltr');

        const appliedTheme = theme === 'auto' ? this.theme : theme;
        const styleClass = ToastStyles[style] || '';
        const themeClass = appliedTheme === 'dark' ? 'dark' : '';

        toast.className = `toast ${ToastStyles[themeClass]} pointer-events-auto flex flex-col gap-2 p-4 max-w-xs w-full rounded-lg shadow-sm ${ToastTypes[type] || ToastTypes.info} ${styleClass} relative overflow-hidden`;

        if(styleClass!==''){
            if (themeClass==='dark'){
                toast.className = `toast pointer-events-auto flex flex-col gap-2 p-4 max-w-xs w-full rounded-lg shadow-sm ${ToastStyles['glassDark']} relative overflow-hidden`;
            }else{
                toast.className = `toast pointer-events-auto flex flex-col gap-2 p-4 max-w-xs w-full rounded-lg shadow-sm ${styleClass} relative overflow-hidden`;
            }
        }else{
            if (themeClass==='dark'){
                toast.className = `toast ${ToastStyles[themeClass]} pointer-events-auto flex flex-col gap-2 p-4 max-w-xs w-full rounded-lg shadow-sm relative overflow-hidden`;
            }else{
                if(typeStyle==='filled'){
                    toast.className = `toast pointer-events-auto flex flex-col gap-2 p-4 max-w-xs w-full rounded-lg shadow-sm ${ToastTypes[type] || ToastTypes.info} relative overflow-hidden`;
                }else{
                    toast.className = `toast pointer-events-auto flex flex-col gap-2 p-4 max-w-xs w-full rounded-lg shadow-sm ${ToastTypesOut[type] || ToastTypesOut.info} relative overflow-hidden`;
                }
            }
        }

        const content = document.createElement('div');
        // content.className = 'flex items-start gap-3 px-1';
        content.className = 'flex';

        if (icon) {
            let iconSym = '';
            let iconSymClass = '';
            if (icon==='default'){
                switch (type) {
                    case 'success':
                        iconSymClass = 'text-green-500 bg-green-100';
                        iconSym = `<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg>
                                    <span class="sr-only">Check icon</span>`;
                        break;
                    case 'error':
                        iconSymClass = 'text-red-500 bg-red-100';
                        iconSym = `<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                </svg>
                                <span class="sr-only">Error icon</span>`;
                        break;
                    case 'warning':
                        iconSymClass = 'text-orange-500 bg-orange-100';
                        iconSym = `<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                                </svg>
                                <span class="sr-only">Warning icon</span>`;
                        break;
                    case 'info':
                        iconSymClass = 'text-blue-500 bg-blue-100';
                        iconSym = `<svg class="shrink-0 size-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                                  </svg>
                                <span class="sr-only">info icon</span>`;
                        break;
                }
            }
            const iconDiv = document.createElement('div');
            iconDiv.className = 'inline-flex items-center justify-center rounded-lg shrink-0 w-8 h-8 ' + iconSymClass;
            iconDiv.innerHTML = icon==='default' ? iconSym : icon;
            content.appendChild(iconDiv);
        }

        const contentText = document.createElement('div');
        contentText.className = 'ms-3 text-sm font-normal mr-3';

        if(title!==''){
            const titleDiv = document.createElement('span');
            titleDiv.className = 'text-sm font-semibold';
            titleDiv.innerHTML = title;
            contentText.appendChild(titleDiv);
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'mt-1 mb-2 text-sm font-normal';
        messageDiv.innerHTML = message;
        contentText.appendChild(messageDiv);

        if (action && typeof action === 'object' && action.label && typeof action.onClick === 'function') {
            const actionBtn = document.createElement('a');
            actionBtn.className = `inline-flex px-2.5 py-1.5 text-xs font-medium text-center cursor-pointer border focus:ring-4 focus:outline-none ${themeClass=='dark' ? 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus:ring-gray-700' : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100 focus:ring-gray-200'}  rounded-lg`;
            actionBtn.textContent = action.label;
            actionBtn.onclick = action.onClick;
            contentText.appendChild(actionBtn);
        }

        content.appendChild(contentText);

        if(showCloseButton){
            const closeBtn = document.createElement('button');
            closeBtn.className = `ms-auto -mx-1.5 -my-1.5 ${themeClass=='dark' ? 'bg-gray-800 text-gray-500 hover:text-white hover:bg-gray-700' : 'bg-white text-gray-400 hover:text-gray-900 hover:bg-gray-100'} rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8`;
            closeBtn.innerHTML = '<span class="sr-only">Close</span>\n' +
                '            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">\n' +
                '                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>\n' +
                '            </svg>';
            closeBtn.onclick = () => this.fadeOut(toast, animation, onClose);
            content.appendChild(closeBtn);
        }

        toast.appendChild(content);

        if (progress) {
            const progressBar = document.createElement('div');
            progressBar.className = `absolute z-30 bottom-0 left-0 h-1 bg-gray-400/35 transition-all`;
            progressBar.style.width = '0%';
            toast.appendChild(progressBar);
            setTimeout(() => {
                progressBar.style.transition = `width ${duration}ms linear`;
                progressBar.style.width = '100%';
            }, 50);
        }

        // ورود
        if (ToastCSSAnimations[animation]) {
            toast.classList.add(ToastCSSAnimations[animation].in);
        }

        container.prepend(toast);

        if (typeof onShow === 'function') onShow();

        setTimeout(() => {
            this.fadeOut(toast, animation, onClose);
        }, duration);
    }

    fadeOut(toast, animation, callback) {
        if (ToastCSSAnimations[animation]) {
            toast.classList.remove(ToastCSSAnimations[animation].in);
            toast.classList.add(ToastCSSAnimations[animation].out);
        } else {
            toast.classList.add('opacity-0');
        }
        setTimeout(() => {
            toast.remove();
            if (typeof callback === 'function') callback();
        }, 400);
    }
}

window.LemonToast = new ToastManager();

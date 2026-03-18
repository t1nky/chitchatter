import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { Language } from 'models/settings'

export const defaultLanguage = Language.ENGLISH

export const resources = {
  en: {
    translation: {
      appName: 'Chitchatter',
      loading: 'Loading',
      language: 'Language',
      languageHelp: 'Choose the language that feels easiest for your family.',
      languages: {
        english: 'English',
        spanish: 'Spanish',
        russian: 'Russian',
      },
      soundOptions: {
        newMessage: 'New Message',
        chime: 'Chime',
        beep: 'Beep',
      },
      home: {
        title: 'Private calls without the usual mess',
        subtitle: '1. Pick a room name\n2. Share the link\n3. Start talking.',
        subTitleSecond:
          'Everything stays in the browser between the people in the room.',
        yourName: 'Your name',
        roomNameLabel: 'Room name',
        roomNameHelp:
          'Full invitation link here, or a simple room name, like family-call.',
        regenerateRoomId: 'Create another room name',
        roomNameType: 'Room name style',
        readableWords: 'Readable words',
        technicalId: 'Technical ID',
        startPrivateRoom: 'Start private room',
        openPublicRoom: 'Open public room',
        startPrivateRoomHelp:
          'Best for family calls and one-off private conversations.',
        openPublicRoomHelp:
          'Use this only when anyone with the room link can join.',
        advancedOptions: 'Advanced options',
        advancedOptionsHelp:
          'Community rooms, embed code, and connectivity tools live here.',
        communityRooms: 'Community rooms',
        embedCode: 'Get embed code',
        privacySummary:
          'Private, encrypted, and temporary.\nWhen everyone leaves, the conversation disappears.',
        additionalInfoAriaLabel: 'Additional information',
        sourceCodeAriaLabel: 'View source code on GitHub',
        sourceCode: 'Source code',
        docs: 'Documentation',
        sourceCodeUnder: 'under',
        readThe: 'Please read the',
        aboutPageAriaLabel: 'Go to About page',
      },
      communityRooms: {
        description:
          "You can also chat in a public community room. You'll be anonymous, but be careful what information you choose to share.",
        room: 'Room',
        join: 'Join',
      },
      settings: {
        title: 'Settings',
        languageTitle: 'Language',
        chatTitle: 'Chat',
        chatBackgroundBehavior: 'When a message arrives in the background:',
        playSound: 'Play a sound',
        showNotification: 'Show a notification',
        soundSelectorLabel: 'Choose the message sound:',
        typingIndicators: 'Show active typing indicators',
        typingIndicatorsHelp:
          'If you turn this off, other people will not see when you are typing.',
        networkingTitle: 'Networking',
        dataTitle: 'Data',
        exportProfileTitle: 'Export profile data',
        exportProfileBody:
          'Export your profile so you can move it to another browser or device. Do not share it with anyone else.',
        exportProfile: 'Export profile data',
        importProfileTitle: 'Import profile data',
        importProfileBody:
          'Import a profile backup to keep the same identity on another device.',
        importProfile: 'Import profile data',
        deleteProfileTitle: 'Delete local profile data',
        deleteProfileBody:
          'This removes your saved profile and resets the app on this device.',
        deleteProfile: 'Delete local profile data',
        deleteProfileWarningStart:
          'Be careful with this. This will change your visible name from',
        deleteProfileWarningEnd:
          'to a new random one and reset your saved Chitchatter preferences.',
        localDataOnly:
          'Chitchatter only stores local preferences and never stores message content on a server.',
        profileImported: 'Profile successfully imported',
      },
      navigation: {
        home: 'Home',
        settings: 'Settings',
        about: 'About',
        disclaimer: 'Disclaimer',
        changeTheme: 'Change theme',
        closeMenu: 'Close menu',
        navigationMenu: 'Navigation menu',
        buildSignature: 'Build signature',
      },
      dialogs: {
        confirm: {
          title: 'Are you sure?',
          description: 'This action cannot be undone.',
          cancel: 'Cancel',
          confirm: 'Confirm',
        },
        upgrade: {
          title: 'Update needed',
          description:
            'In order to function properly, Chitchatter needs to be updated. The update has already been installed in the background. All you need to do is reload the page or click "Refresh" below.',
          refresh: 'Refresh',
        },
        qrCode: {
          title: 'Room QR Code',
          dismiss: 'Dismiss',
          close: 'Close',
        },
        serverConnectionFailure: {
          title: 'Server connection failed',
          description:
            "A pairing server could not be found. Make sure you are connected to the internet. If you still can't connect, try:",
          refresh: 'Refreshing the page',
          disableAdblockers: 'Disabling any adblockers',
          differentNetwork: 'Connecting to a different network',
          close: 'Close',
        },
        environmentUnsupported: {
          title: 'Environment unsupported',
          description:
            'Chitchatter is unable to start up. The following issues were detected:',
          secureContextPrefix: 'The app is not being served from a',
          secureContextLink: 'secure context',
          browserSupportPrefix:
            'Your browser does not support WebRTC. Consider using',
          browserSupportLink: 'a browser that does',
        },
        roomShare: {
          title: 'Copy URL with password',
          simpleTitle: 'Share room',
          simple: 'Simple',
          advanced: 'Advanced',
          close: 'Close',
          understood: 'I understand the risks',
          password: 'Password',
          copyUrl: 'Copy URL',
          copyUrlWithPassword: 'Copy URL with password',
          copyUrlWithPasswordTooltip:
            'Copy room URL with password. No password entry required to access room.',
          copyUrlTooltip: 'Copy room URL. Password required to access room.',
          advancedDescription:
            'Copy URL to this private room containing an indecipherable hash of the password. When using this URL, users will not need to enter the password themselves.',
          dangerAlert:
            'Be careful where and how this URL is shared. Anybody who obtains it can enter the room. The sharing medium must be trusted, as well as all potential recipients of the URL, just as if you were sharing the password itself.',
          warningAlert:
            'By design, the password hash does not leave the web browser when this URL is used to access the room. However, web browsers can still independently record the full URL in the address history, and may even store the history in the cloud if configured to do so.',
          copiedCurrentUrl: 'Current URL copied to clipboard',
          copiedPrivateUrl:
            'Private room URL without password copied to clipboard',
          copiedPrivateUrlWithPassword:
            'Private room URL with password copied to clipboard',
          incorrectPassword:
            'Incorrect password entered. Please wait 2s to retry.',
        },
        passwordPrompt: {
          title: 'Room Password',
          description1:
            'You will only be able to connect to room peers that enter the same password. Due to the decentralized nature of Chitchatter, it is impossible to know if the password you enter will match the password entered by other peers.',
          description2:
            'If there is a mismatch, you will be in the room but be unable to connect to others. An error will not be shown.',
          password: 'Password',
          showPassword: 'Show password',
          hidePassword: 'Hide password',
          goBack: 'Go back',
          submit: 'Submit',
        },
        embedCode: {
          title: 'Embedding Chitchatter',
          iframeIntro:
            'Copy and paste this <iframe> HTML snippet into your project:',
          advancedTitle: 'Advanced Embedding',
          advancedIntroPrefix:
            'As an alternative to using an <iframe>, you can use the',
          sdkLink: 'Chitchatter SDK',
          advancedIntroMiddle: 'to embed a chat room as a',
          webComponentLink: 'Web Component',
          advancedIntroSuffix: 'with additional configuration options:',
          close: 'Close',
        },
      },
      about: {
        title: 'About',
        content: `### User Guide

Chitchatter is a communication tool designed to make secure and private communication accessible to all. Please [see the README](https://github.com/jeremyckahn/chitchatter/blob/develop/README.md) for full project documentation.

#### Chat rooms

Public rooms can be joined by **anyone** with the room URL. By default, rooms are given a random and unguessable name. You can name your room whatever you'd like, but keep in mind that simpler room names are more guessable by others. For maximum security, consider using the default room name.

Private rooms can only be joined by peers with a matching password. The password must be mutually agreed upon before joining. If peers submit mismatching passwords, they will be in the room but be unable to connect to each other. **No error will be shown** if there is a password mismatch because there is no central arbitrating mechanism by which to detect the mismatch.

To connect to others, share the room URL with a secure tool such as [Burner Note](https://burnernote.com/) or [Yopass](https://yopass.se/). You will be notified when others join the room.

##### Peer verification

When you connect with a peer, Chitchatter automatically attempts to use [public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) to verify them. You can see everyone's public keys in the peer list. Feel free to share your public key with others (it is not sensitive information) so that they can uniquely identify you.

All public and private keys are generated locally. Your private key is never sent to any peer or server.

##### Conversation backfilling

Conversation transcripts are erased from local memory as soon as you close the page or navigate away from the room. Conversations are only ever held in volatile memory and never persisted to any disk by Chitchatter.

When a peer joins a **public** room with participants already in it, the new peer will automatically request the transcript of the conversation that has already taken place from the other peers. Once all peers leave the room, the conversation is completely erased. Peers joining a **private** room will not get the conversation transcript backfilled.

Chat transcript history is limited to {{messageTranscriptSizeLimitFormatted}} messages for all rooms.

#### Message Authoring

Chat messages support [GitHub-flavored Markdown](https://github.github.com/gfm/) with code syntax highlighting.

Press \`Enter\` to send a message. Press \`Shift + Enter\` to insert a line break. Message size is limited to {{messageCharacterSizeLimitFormatted}} characters.`,
      },
      disclaimer: {
        title: 'Disclaimer',
        content:
          '### Interpretation and Definitions\n\n#### Interpretation\n\nThe words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.\n\n#### Definitions\n\nFor the purposes of this Disclaimer:\n\n*   **Project** (referred to as either "the Project", "We", "Us" or "Our" in this Disclaimer) refers to Chitchatter.\n*   **Service** refers to the Website.\n*   **You** means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.\n*   **Website** refers to Chitchatter, accessible from [https://chitchatter.im](https://chitchatter.im)\n\n### Disclaimer\n\nThe information contained on the Service is for general information purposes only.\n\nThe Project assumes no responsibility for errors or omissions in the contents of the Service.\n\nIn no event shall the Project be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. The Project reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice.\n\nThe Project does not warrant that the Service is free of viruses or other harmful components.\n\n#### External Links Disclaimer\n\nThe Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Project.\n\nPlease note that the Project does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.\n\n#### Errors and Omissions Disclaimer\n\nThe information given by the Service is for general guidance on matters of interest only. Even if the Project takes every precaution to insure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service.\n\nThe Project is not responsible for any errors or omissions, or for the results obtained from the use of this information.\n\n#### Views Expressed Disclaimer\n\nThe Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Project.\n\nMessages sent by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a message. The Project is not liable for any messages sent by users.\n\n#### No Responsibility Disclaimer\n\nIn no event shall the Project or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.\n\n#### "Use at Your Own Risk" Disclaimer\n\nAll information in the Service is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.\n\nThe Project will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.',
      },
      room: {
        title: 'Room: {{roomId}}',
        joined: 'Someone has joined the room',
        left: '{{name}} has left the room',
        someone: 'Someone',
        peerRenamed: '{{oldUsername}} is now {{newUsername}}',
        sharedMedia: '{{name}} shared media',
        controls: {
          turnOffMicrophone: 'Turn off microphone',
          turnOnMicrophone:
            'Turn on microphone and speak to room (hold ctrl + ` to speak)',
          microphoneControl: 'Toggle microphone',
          microphoneSelection: 'Microphone selection',
          microphoneToUse: 'Microphone to use',
          selectedMicrophone: 'Selected microphone',
          turnOffCamera: 'Turn off camera',
          turnOnCamera: 'Turn on camera',
          cameraControl: 'Toggle camera',
          cameraSelection: 'Camera selection',
          cameraToUse: 'Camera to use',
          selectedCamera: 'Selected camera',
          showMessages: 'Show messages',
          hideMessages: 'Hide messages',
          messagesControl: 'Show messages',
          hideControls: 'Hide controls',
          hideControlsAria: 'Hide controls',
          stopSharingScreen: 'Stop sharing screen',
          shareScreen: 'Share screen with room',
          shareScreenAria: 'Share screen',
          stopSharingFile: 'Stop sharing {{name}}',
          shareFiles: 'Share files with the room',
          shareFilesAria: 'Share files',
          fileFallbackName: 'files',
        },
        fileShare: {
          encryptingSingle: 'Encrypting a copy of the file...',
          encryptingMultiple: 'Encrypting a copy of the files...',
          complete: 'Encryption complete',
        },
        typing: {
          one: '{{name}} is typing...',
          two: '{{first}} and {{second}} are typing...',
          many: 'Several people are typing...',
        },
        verification: {
          failed: 'Verification for {{name}} failed',
          timedOut: 'Verification for {{name}} timed out',
          unverifiedTooltip:
            'This person could not be verified with public-key cryptography. They may be misrepresenting themself. Be careful with what you share with them.',
          verifiedTooltip:
            'This person has been verified with public-key cryptography',
          verifyingTooltip: 'Attempting to verify this person...',
          publicKey: 'Their public key',
        },
        connection: {
          directTo: 'You are connected directly to {{name}}',
          relayedTo:
            'You are connected to {{name}} via a relay server. Your connection is still private and encrypted, but performance may be degraded.',
        },
        audio: {
          peerMicrophoneVolume: 'Their microphone volume',
          peerScreenVolume: "Their screen's volume",
          volume: 'Volume',
        },
        download: {
          tooltip: 'Download files being offered by {{name}}',
        },
      },
      peerList: {
        close: 'Close peer list',
        list: 'Peer list',
        show: 'Click to show peer list',
        searching: 'Searching for peers...',
      },
      shell: {
        openMenu: 'Open menu',
        copyCurrentUrl: 'Copy current URL',
        showQrCode: 'Show QR Code',
        hideRoomControls: 'Hide room controls',
        showRoomControls: 'Show room controls',
        roomControlsAria: 'Show room controls',
        exitFullscreen: 'Exit fullscreen',
        enterFullscreen: 'Enter fullscreen',
        fullscreenAria: 'Fullscreen',
        embeddedFooterPrefix: 'This conversation is powered by',
        embeddedFooterLink: 'Chitchatter',
      },
      connectionStatus: {
        serverConnectionFailed: 'Server connection failed',
        searching: 'Searching for servers...',
        full: 'Full network connection',
        partial: 'Connected',
        none: 'No network connection',
        fullTooltip:
          'Connections can be established with all peers that also have a full network connection.',
        partialTooltip:
          'Relay server is unavailable. Connections can only be established when a relay server is not needed for either peer.',
        noneTooltip:
          'Pairing server is unavailable. Peer connections cannot be established.',
      },
      userInfo: {
        changed: 'Username changed to "{{name}}"',
        reset: 'Username reset',
        reveal: 'Reveal your user info',
        helper: 'Your username',
        yourUsername: 'Your username',
        publicKey: 'Your public key (generated locally):',
        privateKey:
          'Your private key, which was also generated locally, is hidden and only exists on your device.',
        close: 'Close',
      },
      copyable: {
        copied: 'Copied to clipboard',
        copy: 'Copy to clipboard',
      },
      messageForm: {
        placeholder: 'Your message',
        send: 'Send',
      },
      init: {
        bootError:
          'Chitchatter was unable to boot up. Please check the browser console.',
      },
    },
  },
  es: {
    translation: {
      appName: 'Chitchatter',
      loading: 'Cargando',
      language: 'Idioma',
      languageHelp: 'Elegí el idioma que sea más fácil para tu familia.',
      languages: {
        english: 'Inglés',
        spanish: 'Español',
        russian: 'Ruso',
      },
      soundOptions: {
        newMessage: 'Mensaje nuevo',
        chime: 'Campanita',
        beep: 'Beep',
      },
      home: {
        title: 'Llamadas privadas sin complicaciones',
        subtitle:
          'Elegí un nombre de sala, compartí el enlace y empezá a hablar. Todo queda en el navegador entre las personas de la sala.',
        yourName: 'Tu nombre',
        roomNameLabel: 'Nombre de la sala',
        roomNameHelp:
          'Un enlace completo de invitación o un nombre simple, como familia-domingo.',
        regenerateRoomId: 'Crear otro nombre de sala',
        roomNameType: 'Estilo del nombre de sala',
        readableWords: 'Palabras fáciles',
        technicalId: 'ID técnico',
        startPrivateRoom: 'Abrir sala privada',
        openPublicRoom: 'Abrir sala pública',
        startPrivateRoomHelp:
          'Lo mejor para llamadas familiares y conversaciones privadas.',
        openPublicRoomHelp:
          'Usalo solo cuando cualquier persona con el enlace pueda entrar.',
        advancedOptions: 'Opciones avanzadas',
        advancedOptionsHelp:
          'Las salas comunitarias, el código para embeber y las herramientas de conectividad están acá.',
        communityRooms: 'Salas comunitarias',
        embedCode: 'Obtener código para embeber',
        privacySummary:
          'Privado, cifrado y temporal. Cuando todos se van, la conversación desaparece.',
        additionalInfoAriaLabel: 'Opciones e información adicional',
        sourceCodeAriaLabel: 'Ver código fuente en GitHub',
        sourceCode: 'Código fuente',
        docs: 'documentación',
        sourceCodeUnder: 'bajo licencia',
        readThe: 'Leé la',
        aboutPageAriaLabel: 'Ir a la página Acerca de',
      },
      communityRooms: {
        description:
          'También podés chatear en una sala comunitaria pública. Vas a ser anónimo, pero tené cuidado con la información que decidís compartir.',
        room: 'Sala',
        join: 'Entrar',
      },
      settings: {
        title: 'Configuración',
        languageTitle: 'Idioma',
        chatTitle: 'Chat',
        chatBackgroundBehavior: 'Cuando llega un mensaje en segundo plano:',
        playSound: 'Reproducir un sonido',
        showNotification: 'Mostrar una notificación',
        soundSelectorLabel: 'Elegí el sonido del mensaje:',
        typingIndicators: 'Mostrar indicadores de escritura',
        typingIndicatorsHelp:
          'Si desactivás esto, las demás personas no verán cuando estás escribiendo.',
        networkingTitle: 'Red',
        dataTitle: 'Datos',
        exportProfileTitle: 'Exportar datos del perfil',
        exportProfileBody:
          'Exportá tu perfil para moverlo a otro navegador o dispositivo. No lo compartas con nadie.',
        exportProfile: 'Exportar datos del perfil',
        importProfileTitle: 'Importar datos del perfil',
        importProfileBody:
          'Importá una copia de seguridad del perfil para mantener la misma identidad en otro dispositivo.',
        importProfile: 'Importar datos del perfil',
        deleteProfileTitle: 'Eliminar datos locales del perfil',
        deleteProfileBody:
          'Esto elimina tu perfil guardado y reinicia la app en este dispositivo.',
        deleteProfile: 'Eliminar datos locales del perfil',
        deleteProfileWarningStart:
          'Cuidado con esto. Tu nombre visible cambiará de',
        deleteProfileWarningEnd:
          'a uno nuevo aleatorio y se restablecerán tus preferencias guardadas de Chitchatter.',
        localDataOnly:
          'Chitchatter solo guarda preferencias locales y nunca almacena el contenido de los mensajes en un servidor.',
        profileImported: 'Perfil importado correctamente',
      },
      navigation: {
        home: 'Inicio',
        settings: 'Configuración',
        about: 'Acerca de',
        disclaimer: 'Descargo de responsabilidad',
        changeTheme: 'Cambiar tema',
        closeMenu: 'Cerrar menú',
        navigationMenu: 'Menú de navegación',
        buildSignature: 'Firma de compilación',
      },
      dialogs: {
        confirm: {
          title: '¿Estás seguro?',
          description: 'Esta acción no se puede deshacer.',
          cancel: 'Cancelar',
          confirm: 'Confirmar',
        },
        upgrade: {
          title: 'Hace falta actualizar',
          description:
            'Para funcionar correctamente, Chitchatter necesita actualizarse. La actualización ya se instaló en segundo plano. Solo tenés que recargar la página o hacer clic en "Actualizar" abajo.',
          refresh: 'Actualizar',
        },
        qrCode: {
          title: 'Código QR de la sala',
          dismiss: 'Cerrar',
          close: 'Cerrar',
        },
        serverConnectionFailure: {
          title: 'Falló la conexión con el servidor',
          description:
            'No se pudo encontrar un servidor de emparejamiento. Asegurate de estar conectado a internet. Si seguís sin poder conectarte, probá:',
          refresh: 'Recargar la página',
          disableAdblockers: 'Desactivar bloqueadores de anuncios',
          differentNetwork: 'Conectarte a otra red',
          close: 'Cerrar',
        },
        environmentUnsupported: {
          title: 'Entorno no compatible',
          description:
            'Chitchatter no pudo iniciarse. Se detectaron estos problemas:',
          secureContextPrefix: 'La app no se está sirviendo desde un',
          secureContextLink: 'contexto seguro',
          browserSupportPrefix:
            'Tu navegador no es compatible con WebRTC. Considerá usar',
          browserSupportLink: 'un navegador que sí lo sea',
        },
        roomShare: {
          title: 'Copiar URL con contraseña',
          simpleTitle: 'Compartir sala',
          simple: 'Simple',
          advanced: 'Avanzado',
          close: 'Cerrar',
          understood: 'Entiendo los riesgos',
          password: 'Contraseña',
          copyUrl: 'Copiar URL',
          copyUrlWithPassword: 'Copiar URL con contraseña',
          copyUrlWithPasswordTooltip:
            'Copiar URL de la sala con contraseña. No hace falta ingresar la contraseña para acceder.',
          copyUrlTooltip:
            'Copiar URL de la sala. Hace falta la contraseña para acceder.',
          advancedDescription:
            'Copiá la URL de esta sala privada con un hash indescifrable de la contraseña. Si se usa esta URL, las personas no tendrán que ingresar la contraseña manualmente.',
          dangerAlert:
            'Tené cuidado con dónde y cómo compartís esta URL. Cualquiera que la obtenga podrá entrar a la sala. El medio para compartirla debe ser confiable, al igual que todos los posibles destinatarios, como si estuvieras compartiendo la contraseña.',
          warningAlert:
            'Por diseño, el hash de la contraseña no sale del navegador cuando se usa esta URL para entrar a la sala. Sin embargo, los navegadores pueden registrar igual la URL completa en el historial e incluso guardarlo en la nube si así están configurados.',
          copiedCurrentUrl: 'URL actual copiada al portapapeles',
          copiedPrivateUrl:
            'URL de sala privada sin contraseña copiada al portapapeles',
          copiedPrivateUrlWithPassword:
            'URL de sala privada con contraseña copiada al portapapeles',
          incorrectPassword:
            'La contraseña ingresada es incorrecta. Esperá 2 segundos para volver a intentarlo.',
        },
        passwordPrompt: {
          title: 'Contraseña de la sala',
          description1:
            'Solo vas a poder conectarte con personas de la sala que ingresen la misma contraseña. Por la naturaleza descentralizada de Chitchatter, es imposible saber si la contraseña que ingresás coincide con la de las demás personas.',
          description2:
            'Si no coincide, vas a estar en la sala pero no vas a poder conectarte con otras personas. No se mostrará ningún error.',
          password: 'Contraseña',
          showPassword: 'Mostrar contraseña',
          hidePassword: 'Ocultar contraseña',
          goBack: 'Volver',
          submit: 'Enviar',
        },
        embedCode: {
          title: 'Cómo embeber Chitchatter',
          iframeIntro:
            'Copiá y pegá este fragmento HTML de <iframe> en tu proyecto:',
          advancedTitle: 'Embebido avanzado',
          advancedIntroPrefix:
            'Como alternativa al uso de un <iframe>, podés usar el',
          sdkLink: 'SDK de Chitchatter',
          advancedIntroMiddle: 'para embeber una sala de chat como',
          webComponentLink: 'Web Component',
          advancedIntroSuffix: 'con opciones de configuración adicionales:',
          close: 'Cerrar',
        },
      },
      about: {
        title: 'Acerca de',
        content: `### Guía de uso

Chitchatter es una herramienta de comunicación diseñada para que la comunicación segura y privada sea accesible para todas las personas. Leé el [README](https://github.com/jeremyckahn/chitchatter/blob/develop/README.md) para ver la documentación completa del proyecto.

#### Salas de chat

A las salas públicas puede entrar **cualquier persona** que tenga la URL. De forma predeterminada, las salas reciben un nombre aleatorio y difícil de adivinar. Podés ponerle el nombre que quieras, pero tené en cuenta que los nombres más simples son más fáciles de adivinar para otras personas. Para máxima seguridad, conviene usar el nombre predeterminado.

A las salas privadas solo pueden entrar personas con una contraseña que coincida. Esa contraseña tiene que acordarse de antemano. Si distintas personas ingresan contraseñas diferentes, estarán en la sala pero no podrán conectarse entre sí. **No se mostrará ningún error** si la contraseña no coincide porque no existe un mecanismo central que pueda detectarlo.

Para conectarte con otras personas, compartí la URL de la sala usando una herramienta segura como [Burner Note](https://burnernote.com/) o [Yopass](https://yopass.se/). Vas a recibir una notificación cuando alguien entre.

##### Verificación de pares

Cuando te conectás con otra persona, Chitchatter intenta verificarla automáticamente mediante [criptografía de clave pública](https://en.wikipedia.org/wiki/Public-key_cryptography). Podés ver las claves públicas de todas las personas en la lista de participantes. Si querés, podés compartir tu clave pública con otras personas, porque no es información sensible, para que puedan identificarte de forma única.

Todas las claves públicas y privadas se generan de manera local. Tu clave privada nunca se envía a ninguna persona ni servidor.

##### Recuperación de conversaciones

Los historiales de conversación se borran de la memoria local apenas cerrás la página o salís de la sala. Las conversaciones solo se conservan en memoria volátil y nunca se guardan en disco por Chitchatter.

Cuando una persona entra a una sala **pública** donde ya hay participantes, esa persona nueva solicitará automáticamente a las demás el historial de la conversación ya ocurrida. Cuando todas las personas se van, la conversación se borra por completo. Las personas que entren a una sala **privada** no recibirán ese historial.

El historial de chat está limitado a {{messageTranscriptSizeLimitFormatted}} mensajes en todas las salas.

#### Escritura de mensajes

Los mensajes del chat admiten [Markdown estilo GitHub](https://github.github.com/gfm/) con resaltado de sintaxis para código.

Presioná \`Enter\` para enviar un mensaje. Presioná \`Shift + Enter\` para insertar un salto de línea. El tamaño máximo del mensaje es de {{messageCharacterSizeLimitFormatted}} caracteres.`,
      },
      disclaimer: {
        title: 'Descargo de responsabilidad',
        content:
          '### Interpretación y definiciones\n\n#### Interpretación\n\nLas palabras cuya letra inicial aparece en mayúscula tienen significados definidos bajo las siguientes condiciones. Las definiciones tendrán el mismo significado tanto en singular como en plural.\n\n#### Definiciones\n\nA los efectos de este descargo de responsabilidad:\n\n*   **Proyecto** (denominado como "el Proyecto", "Nosotros", "Nuestro" o "Nos" en este descargo) se refiere a Chitchatter.\n*   **Servicio** se refiere al sitio web.\n*   **Vos** significa la persona que accede al Servicio, o la empresa u otra entidad legal en nombre de la cual esa persona accede o usa el Servicio, según corresponda.\n*   **Sitio web** se refiere a Chitchatter, accesible desde [https://chitchatter.im](https://chitchatter.im)\n\n### Descargo de responsabilidad\n\nLa información contenida en el Servicio es solo para fines informativos generales.\n\nEl Proyecto no asume ninguna responsabilidad por errores u omisiones en los contenidos del Servicio.\n\nEn ningún caso el Proyecto será responsable por daños especiales, directos, indirectos, consecuentes o incidentales, ni por ningún otro daño, ya sea en una acción contractual, negligencia u otro tipo de responsabilidad, que surja de o esté relacionado con el uso del Servicio o de sus contenidos. El Proyecto se reserva el derecho de agregar, eliminar o modificar contenidos del Servicio en cualquier momento y sin previo aviso.\n\nEl Proyecto no garantiza que el Servicio esté libre de virus u otros componentes dañinos.\n\n#### Descargo sobre enlaces externos\n\nEl Servicio puede contener enlaces a sitios web externos que no son proporcionados ni mantenidos por el Proyecto, ni están afiliados de ningún modo con él.\n\nTené en cuenta que el Proyecto no garantiza la precisión, relevancia, actualidad ni integridad de ninguna información en esos sitios externos.\n\n#### Descargo por errores y omisiones\n\nLa información brindada por el Servicio tiene fines de orientación general sobre asuntos de interés. Aunque el Proyecto tome todas las precauciones para que el contenido sea actual y correcto, pueden ocurrir errores. Además, dada la naturaleza cambiante de las leyes, reglas y regulaciones, puede haber demoras, omisiones o imprecisiones en la información contenida en el Servicio.\n\nEl Proyecto no es responsable por errores u omisiones ni por los resultados obtenidos a partir del uso de esta información.\n\n#### Descargo sobre opiniones expresadas\n\nEl Servicio puede contener opiniones y puntos de vista que pertenecen a sus autores y no necesariamente reflejan la política oficial o posición de ninguna otra persona autora, agencia, organización, empleador o empresa, incluido el Proyecto.\n\nLos mensajes enviados por las personas usuarias son su exclusiva responsabilidad, y esas personas asumirán toda responsabilidad, obligación y culpa por cualquier difamación o litigio que resulte de algo escrito en un mensaje o como resultado directo de ello. El Proyecto no es responsable por los mensajes enviados por personas usuarias.\n\n#### Descargo de no responsabilidad\n\nEn ningún caso el Proyecto ni sus proveedores serán responsables por daños especiales, incidentales, indirectos o consecuentes derivados de o relacionados con tu acceso, uso o imposibilidad de acceso o uso del Servicio.\n\n#### Descargo de "uso bajo tu propio riesgo"\n\nToda la información del Servicio se proporciona "tal cual", sin garantía de integridad, precisión, oportunidad ni de los resultados obtenidos por el uso de esa información, y sin garantía de ningún tipo, expresa o implícita, incluidas, entre otras, garantías de rendimiento, comerciabilidad e idoneidad para un fin particular.\n\nEl Proyecto no será responsable ante vos ni ante ninguna otra persona por decisiones tomadas o acciones realizadas en base a la información proporcionada por el Servicio, ni por daños consecuentes, especiales o similares, incluso si se hubiera advertido sobre la posibilidad de esos daños.',
      },
      room: {
        title: 'Sala: {{roomId}}',
        joined: 'Alguien entró a la sala',
        left: '{{name}} salió de la sala',
        someone: 'Alguien',
        peerRenamed: '{{oldUsername}} ahora es {{newUsername}}',
        sharedMedia: '{{name}} compartió contenido',
        controls: {
          turnOffMicrophone: 'Apagar micrófono',
          turnOnMicrophone:
            'Encender micrófono y hablar en la sala (mantené ctrl + ` para hablar)',
          microphoneControl: 'Alternar micrófono',
          microphoneSelection: 'Selección de micrófono',
          microphoneToUse: 'Micrófono a usar',
          selectedMicrophone: 'Micrófono seleccionado',
          turnOffCamera: 'Apagar cámara',
          turnOnCamera: 'Encender cámara',
          cameraControl: 'Alternar cámara',
          cameraSelection: 'Selección de cámara',
          cameraToUse: 'Cámara a usar',
          selectedCamera: 'Cámara seleccionada',
          showMessages: 'Mostrar mensajes',
          hideMessages: 'Ocultar mensajes',
          messagesControl: 'Mostrar mensajes',
          hideControls: 'Ocultar controles',
          hideControlsAria: 'Ocultar controles',
          stopSharingScreen: 'Dejar de compartir pantalla',
          shareScreen: 'Compartir pantalla con la sala',
          shareScreenAria: 'Compartir pantalla',
          stopSharingFile: 'Dejar de compartir {{name}}',
          shareFiles: 'Compartir archivos con la sala',
          shareFilesAria: 'Compartir archivos',
          fileFallbackName: 'archivos',
        },
        fileShare: {
          encryptingSingle: 'Cifrando una copia del archivo...',
          encryptingMultiple: 'Cifrando una copia de los archivos...',
          complete: 'Cifrado completo',
        },
        typing: {
          one: '{{name}} está escribiendo...',
          two: '{{first}} y {{second}} están escribiendo...',
          many: 'Varias personas están escribiendo...',
        },
        verification: {
          failed: 'Falló la verificación de {{name}}',
          timedOut: 'La verificación de {{name}} agotó el tiempo',
          unverifiedTooltip:
            'No se pudo verificar a esta persona con criptografía de clave pública. Podría estar haciéndose pasar por otra persona. Tené cuidado con lo que compartís.',
          verifiedTooltip:
            'Esta persona fue verificada con criptografía de clave pública',
          verifyingTooltip: 'Intentando verificar a esta persona...',
          publicKey: 'Su clave pública',
        },
        connection: {
          directTo: 'Estás conectado directamente con {{name}}',
          relayedTo:
            'Estás conectado con {{name}} a través de un servidor relay. La conexión sigue siendo privada y cifrada, pero el rendimiento puede verse afectado.',
        },
        audio: {
          peerMicrophoneVolume: 'Volumen de su micrófono',
          peerScreenVolume: 'Volumen de su pantalla',
          volume: 'Volumen',
        },
        download: {
          tooltip: 'Descargar archivos ofrecidos por {{name}}',
        },
      },
      peerList: {
        close: 'Cerrar lista de participantes',
        list: 'Lista de participantes',
        show: 'Hacé clic para mostrar la lista de participantes',
        searching: 'Buscando participantes...',
      },
      shell: {
        openMenu: 'Abrir menú',
        copyCurrentUrl: 'Copiar URL actual',
        showQrCode: 'Mostrar código QR',
        hideRoomControls: 'Ocultar controles de la sala',
        showRoomControls: 'Mostrar controles de la sala',
        roomControlsAria: 'Mostrar controles de la sala',
        exitFullscreen: 'Salir de pantalla completa',
        enterFullscreen: 'Entrar en pantalla completa',
        fullscreenAria: 'Pantalla completa',
        embeddedFooterPrefix: 'Esta conversación funciona con',
        embeddedFooterLink: 'Chitchatter',
      },
      connectionStatus: {
        serverConnectionFailed: 'Falló la conexión con el servidor',
        searching: 'Buscando servidores...',
        full: 'Conexión de red completa',
        partial: 'Conectado',
        none: 'Sin conexión de red',
        fullTooltip:
          'Se pueden establecer conexiones con todas las personas que también tengan conectividad completa.',
        partialTooltip:
          'El servidor relay no está disponible. Solo se podrán establecer conexiones cuando ningún par necesite relay.',
        noneTooltip:
          'El servidor de emparejamiento no está disponible. No se pueden establecer conexiones entre pares.',
      },
      userInfo: {
        changed: 'Tu nombre de usuario cambió a "{{name}}"',
        reset: 'Se restableció tu nombre de usuario',
        reveal: 'Mostrar tu información de usuario',
        helper: 'Tu nombre de usuario',
        yourUsername: 'Tu nombre de usuario',
        publicKey: 'Tu clave pública (generada localmente):',
        privateKey:
          'Tu clave privada, también generada localmente, está oculta y solo existe en tu dispositivo.',
        close: 'Cerrar',
      },
      copyable: {
        copied: 'Copiado al portapapeles',
        copy: 'Copiar al portapapeles',
      },
      messageForm: {
        placeholder: 'Tu mensaje',
        send: 'Enviar',
      },
      init: {
        bootError:
          'Chitchatter no pudo iniciarse. Revisá la consola del navegador.',
      },
    },
  },
  ru: {
    translation: {
      appName: 'Chitchatter',
      loading: 'Загрузка',
      language: 'Язык',
      languageHelp: 'Выберите язык, который проще всего вашей семье.',
      languages: {
        english: 'Английский',
        spanish: 'Испанский',
        russian: 'Русский',
      },
      soundOptions: {
        newMessage: 'Новое сообщение',
        chime: 'Перезвон',
        beep: 'Сигнал',
      },
      home: {
        title: 'Приватные звонки без лишней сложности',
        subtitle:
          '1. Выберите название комнаты.\n2. Поделитесь ссылкой.\n 3. Начинайте разговор.',
        subTitleSecond: 'Все остается в браузере между участниками комнаты.',
        yourName: 'Ваше имя',
        roomNameLabel: 'Название комнаты',
        roomNameHelp:
          'Полная ссылка-приглашение или простое название комнаты, например family-call.',
        regenerateRoomId: 'Создать другое название комнаты',
        roomNameType: 'Стиль названия комнаты',
        readableWords: 'Понятные слова',
        technicalId: 'Технический ID',
        startPrivateRoom: 'Открыть приватную комнату',
        openPublicRoom: 'Открыть публичную комнату',
        startPrivateRoomHelp:
          'Лучше всего подходит для семейных звонков и приватных разговоров.',
        openPublicRoomHelp:
          'Используйте это только если любой человек по ссылке может присоединиться.',
        advancedOptions: 'Дополнительные настройки',
        advancedOptionsHelp:
          'Комнаты сообщества, код для встраивания и параметры сети находятся здесь.',
        communityRooms: 'Комнаты сообщества',
        embedCode: 'Получить код для встраивания',
        privacySummary:
          'Приватно, зашифровано и временно. Когда все выходят, разговор исчезает.',
        additionalInfoAriaLabel: 'Дополнительная информация',
        sourceCodeAriaLabel: 'Посмотреть исходный код на GitHub',
        sourceCode: 'Исходный код',
        docs: 'Документация',
        sourceCodeUnder: 'по лицензии',
        readThe: 'Пожалуйста, прочитайте',
        aboutPageAriaLabel: 'Перейти на страницу О проекте',
      },
      communityRooms: {
        description:
          'Вы также можете общаться в публичной комнате сообщества. Вы будете анонимны, но будьте осторожны с тем, какой информацией делитесь.',
        room: 'Комната',
        join: 'Войти',
      },
      settings: {
        title: 'Настройки',
        languageTitle: 'Язык',
        chatTitle: 'Чат',
        chatBackgroundBehavior: 'Когда сообщение приходит в фоновом режиме:',
        playSound: 'Проигрывать звук',
        showNotification: 'Показывать уведомление',
        soundSelectorLabel: 'Выберите звук сообщения:',
        typingIndicators: 'Показывать индикатор набора текста',
        typingIndicatorsHelp:
          'Если отключить это, другие не будут видеть, что вы печатаете.',
        networkingTitle: 'Сеть',
        dataTitle: 'Данные',
        exportProfileTitle: 'Экспорт данных профиля',
        exportProfileBody:
          'Экспортируйте профиль, чтобы перенести его в другой браузер или на другое устройство. Не делитесь этим файлом.',
        exportProfile: 'Экспорт данных профиля',
        importProfileTitle: 'Импорт данных профиля',
        importProfileBody:
          'Импортируйте резервную копию профиля, чтобы сохранить ту же личность на другом устройстве.',
        importProfile: 'Импорт данных профиля',
        deleteProfileTitle: 'Удалить локальные данные профиля',
        deleteProfileBody:
          'Это удалит сохраненный профиль и сбросит приложение на этом устройстве.',
        deleteProfile: 'Удалить локальные данные профиля',
        deleteProfileWarningStart:
          'Будьте осторожны. Ваше отображаемое имя изменится с',
        deleteProfileWarningEnd:
          'на новое случайное имя, а сохраненные настройки Chitchatter будут сброшены.',
        localDataOnly:
          'Chitchatter хранит только локальные настройки и никогда не сохраняет сообщения на сервере.',
        profileImported: 'Профиль успешно импортирован',
      },
      navigation: {
        home: 'Главная',
        settings: 'Настройки',
        about: 'О проекте',
        disclaimer: 'Отказ от ответственности',
        changeTheme: 'Сменить тему',
        closeMenu: 'Закрыть меню',
        navigationMenu: 'Меню навигации',
        buildSignature: 'Идентификатор сборки',
      },
      dialogs: {
        confirm: {
          title: 'Вы уверены?',
          description: 'Это действие нельзя отменить.',
          cancel: 'Отмена',
          confirm: 'Подтвердить',
        },
        upgrade: {
          title: 'Требуется обновление',
          description:
            'Чтобы Chitchatter работал корректно, его нужно обновить. Обновление уже установлено в фоновом режиме. Достаточно перезагрузить страницу или нажать «Обновить» ниже.',
          refresh: 'Обновить',
        },
        qrCode: {
          title: 'QR-код комнаты',
          dismiss: 'Закрыть',
          close: 'Закрыть',
        },
        serverConnectionFailure: {
          title: 'Не удалось подключиться к серверу',
          description:
            'Не удалось найти сервер сопряжения. Убедитесь, что вы подключены к интернету. Если проблема сохраняется, попробуйте:',
          refresh: 'Перезагрузить страницу',
          disableAdblockers: 'Отключить блокировщики рекламы',
          differentNetwork: 'Подключиться к другой сети',
          close: 'Закрыть',
        },
        environmentUnsupported: {
          title: 'Среда не поддерживается',
          description:
            'Chitchatter не удалось запустить. Обнаружены следующие проблемы:',
          secureContextPrefix: 'Приложение не загружено из',
          secureContextLink: 'защищенного контекста',
          browserSupportPrefix:
            'Ваш браузер не поддерживает WebRTC. Рассмотрите возможность использовать',
          browserSupportLink: 'браузер с поддержкой WebRTC',
        },
        roomShare: {
          title: 'Скопировать URL с паролем',
          simpleTitle: 'Поделиться комнатой',
          simple: 'Простой',
          advanced: 'Дополнительно',
          close: 'Закрыть',
          understood: 'Я понимаю риски',
          password: 'Пароль',
          copyUrl: 'Скопировать URL',
          copyUrlWithPassword: 'Скопировать URL с паролем',
          copyUrlWithPasswordTooltip:
            'Скопировать URL комнаты с паролем. Для входа не потребуется вводить пароль.',
          copyUrlTooltip:
            'Скопировать URL комнаты. Для входа потребуется пароль.',
          advancedDescription:
            'Скопируйте URL этой приватной комнаты, содержащий нечитаемый хэш пароля. При использовании такого URL пользователям не нужно будет вводить пароль вручную.',
          dangerAlert:
            'Будьте осторожны с тем, где и как вы делитесь этим URL. Любой, кто получит его, сможет войти в комнату. Канал передачи должен быть доверенным, как и все возможные получатели этой ссылки, точно так же, как если бы вы делились самим паролем.',
          warningAlert:
            'По задумке хэш пароля не покидает браузер, когда этот URL используется для входа в комнату. Однако браузеры все равно могут сохранить полный URL в истории адресов, а иногда и синхронизировать ее в облако, если это включено.',
          copiedCurrentUrl: 'Текущий URL скопирован в буфер обмена',
          copiedPrivateUrl:
            'URL приватной комнаты без пароля скопирован в буфер обмена',
          copiedPrivateUrlWithPassword:
            'URL приватной комнаты с паролем скопирован в буфер обмена',
          incorrectPassword:
            'Введен неверный пароль. Подождите 2 секунды и попробуйте снова.',
        },
        passwordPrompt: {
          title: 'Пароль комнаты',
          description1:
            'Вы сможете подключиться только к тем участникам комнаты, которые введут тот же пароль. Из-за децентрализованной природы Chitchatter невозможно определить, совпадает ли введенный вами пароль с паролем других участников.',
          description2:
            'Если пароль не совпадет, вы окажетесь в комнате, но не сможете подключиться к другим. Ошибка показана не будет.',
          password: 'Пароль',
          showPassword: 'Показать пароль',
          hidePassword: 'Скрыть пароль',
          goBack: 'Назад',
          submit: 'Отправить',
        },
        embedCode: {
          title: 'Встраивание Chitchatter',
          iframeIntro:
            'Скопируйте и вставьте этот HTML-фрагмент <iframe> в свой проект:',
          advancedTitle: 'Расширенное встраивание',
          advancedIntroPrefix:
            'Вместо использования <iframe> вы можете использовать',
          sdkLink: 'SDK Chitchatter',
          advancedIntroMiddle: 'чтобы встроить комнату чата как',
          webComponentLink: 'Web Component',
          advancedIntroSuffix: 'с дополнительными параметрами настройки:',
          close: 'Закрыть',
        },
      },
      about: {
        title: 'О проекте',
        content: `### Руководство пользователя

Chitchatter — это инструмент общения, созданный для того, чтобы сделать безопасное и приватное общение доступным для всех. Полную документацию по проекту можно найти в [README](https://github.com/jeremyckahn/chitchatter/blob/develop/README.md).

#### Комнаты чата

К **публичным** комнатам может присоединиться **любой**, у кого есть URL комнаты. По умолчанию комнаты получают случайные и трудно угадываемые имена. Вы можете назвать комнату как угодно, но помните, что более простые названия легче угадать. Для максимальной безопасности лучше использовать имя по умолчанию.

К **приватным** комнатам могут присоединиться только участники с совпадающим паролем. Пароль нужно заранее согласовать между собой. Если участники введут разные пароли, они будут находиться в комнате, но не смогут подключиться друг к другу. **Ошибка не будет показана**, потому что не существует центрального механизма, который мог бы обнаружить несоответствие.

Чтобы подключиться к другим, поделитесь URL комнаты через безопасный сервис, например [Burner Note](https://burnernote.com/) или [Yopass](https://yopass.se/). Вы получите уведомление, когда кто-то войдет в комнату.

##### Проверка участников

Когда вы подключаетесь к участнику, Chitchatter автоматически пытается проверить его с помощью [криптографии с открытым ключом](https://en.wikipedia.org/wiki/Public-key_cryptography). Открытые ключи всех участников можно увидеть в списке участников. Вы можете делиться своим открытым ключом с другими — это не секретная информация — чтобы они могли однозначно идентифицировать вас.

Все открытые и закрытые ключи генерируются локально. Ваш закрытый ключ никогда не отправляется ни одному участнику или серверу.

##### Восстановление истории разговора

История разговора удаляется из локальной памяти сразу после закрытия страницы или выхода из комнаты. Разговоры хранятся только в оперативной памяти и никогда не записываются Chitchatter на диск.

Когда новый участник входит в **публичную** комнату, где уже есть люди, он автоматически запрашивает у остальных историю уже состоявшейся беседы. Когда все участники покидают комнату, разговор полностью удаляется. Участники, входящие в **приватную** комнату, не получают предыдущую историю сообщений.

История чата ограничена {{messageTranscriptSizeLimitFormatted}} сообщениями для всех комнат.

#### Написание сообщений

Сообщения поддерживают [GitHub Flavored Markdown](https://github.github.com/gfm/) с подсветкой синтаксиса кода.

Нажмите \`Enter\`, чтобы отправить сообщение. Нажмите \`Shift + Enter\`, чтобы вставить перевод строки. Размер сообщения ограничен {{messageCharacterSizeLimitFormatted}} символами.`,
      },
      disclaimer: {
        title: 'Отказ от ответственности',
        content:
          '### Толкование и определения\n\n#### Толкование\n\nСлова, начинающиеся с заглавной буквы, имеют значения, определенные ниже. Эти определения имеют одинаковое значение независимо от того, употребляются ли они в единственном или множественном числе.\n\n#### Определения\n\nДля целей данного отказа от ответственности:\n\n*   **Проект** (далее именуемый «Проект», «Мы», «Нас» или «Наш») означает Chitchatter.\n*   **Сервис** означает веб-сайт.\n*   **Вы** означает физическое лицо, получающее доступ к Сервису, либо компанию или иную юридическую организацию, от имени которой такое лицо получает доступ к Сервису или использует его.\n*   **Веб-сайт** означает Chitchatter, доступный по адресу [https://chitchatter.im](https://chitchatter.im)\n\n### Отказ от ответственности\n\nИнформация, содержащаяся в Сервисе, предназначена только для общих информационных целей.\n\nПроект не несет ответственности за ошибки или упущения в содержимом Сервиса.\n\nНи при каких обстоятельствах Проект не несет ответственности за какие-либо специальные, прямые, косвенные, последующие или случайные убытки либо любые иные убытки, возникшие в результате договорных отношений, небрежности или иного правонарушения, связанные с использованием Сервиса или его содержимого. Проект оставляет за собой право в любое время без предварительного уведомления вносить дополнения, удаления или изменения в содержимое Сервиса.\n\nПроект не гарантирует, что Сервис не содержит вирусов или иных вредоносных компонентов.\n\n#### Отказ от ответственности за внешние ссылки\n\nСервис может содержать ссылки на внешние веб-сайты, которые не предоставляются и не поддерживаются Проектом и никак с ним не связаны.\n\nОбратите внимание, что Проект не гарантирует точность, актуальность, своевременность или полноту какой-либо информации на этих внешних сайтах.\n\n#### Отказ от ответственности за ошибки и упущения\n\nИнформация, предоставляемая Сервисом, носит общий справочный характер по вопросам, представляющим интерес. Даже если Проект предпринимает все меры для того, чтобы содержимое Сервиса было актуальным и точным, ошибки возможны. Кроме того, учитывая изменчивый характер законов, правил и нормативов, в содержащейся в Сервисе информации могут быть задержки, упущения или неточности.\n\nПроект не несет ответственности за любые ошибки или упущения, а также за результаты, полученные в результате использования этой информации.\n\n#### Отказ от ответственности за выраженные мнения\n\nСервис может содержать мнения и взгляды, принадлежащие их авторам, которые не обязательно отражают официальную политику или позицию любого другого автора, агентства, организации, работодателя или компании, включая Проект.\n\nСообщения, отправленные пользователями, являются их исключительной ответственностью, и пользователи несут полную ответственность и вину за любую клевету или судебные разбирательства, возникшие вследствие чего-либо написанного в сообщении или как прямой результат такого сообщения. Проект не несет ответственности за сообщения, отправленные пользователями.\n\n#### Отказ от ответственности за отсутствие ответственности\n\nНи при каких обстоятельствах Проект или его поставщики не несут ответственности за какие-либо специальные, случайные, косвенные или последующие убытки, возникшие в результате или в связи с вашим доступом, использованием или невозможностью доступа или использования Сервиса.\n\n#### Отказ от ответственности «на ваш страх и риск»\n\nВся информация в Сервисе предоставляется «как есть», без каких-либо гарантий полноты, точности, своевременности или результатов, полученных в результате использования этой информации, а также без каких-либо гарантий, явных или подразумеваемых, включая, помимо прочего, гарантии производительности, товарной пригодности и пригодности для определенной цели.\n\nПроект не несет ответственности перед вами или кем-либо еще за любое решение или действие, предпринятое на основании информации, предоставленной Сервисом, а также за любые последующие, специальные или аналогичные убытки, даже если была сообщена возможность таких убытков.',
      },
      room: {
        title: 'Комната: {{roomId}}',
        joined: 'Кто-то вошел в комнату',
        left: '{{name}} покинул(а) комнату',
        someone: 'Кто-то',
        peerRenamed: '{{oldUsername}} теперь {{newUsername}}',
        sharedMedia: '{{name}} поделился(ась) медиа',
        controls: {
          turnOffMicrophone: 'Выключить микрофон',
          turnOnMicrophone:
            'Включить микрофон и говорить в комнату (удерживайте ctrl + ` для разговора)',
          microphoneControl: 'Переключить микрофон',
          microphoneSelection: 'Выбор микрофона',
          microphoneToUse: 'Какой микрофон использовать',
          selectedMicrophone: 'Выбранный микрофон',
          turnOffCamera: 'Выключить камеру',
          turnOnCamera: 'Включить камеру',
          cameraControl: 'Переключить камеру',
          cameraSelection: 'Выбор камеры',
          cameraToUse: 'Какую камеру использовать',
          selectedCamera: 'Выбранная камера',
          showMessages: 'Показать сообщения',
          hideMessages: 'Скрыть сообщения',
          messagesControl: 'Показать сообщения',
          hideControls: 'Скрыть элементы управления',
          hideControlsAria: 'Скрыть элементы управления',
          stopSharingScreen: 'Остановить демонстрацию экрана',
          shareScreen: 'Поделиться экраном с комнатой',
          shareScreenAria: 'Поделиться экраном',
          stopSharingFile: 'Прекратить делиться {{name}}',
          shareFiles: 'Поделиться файлами с комнатой',
          shareFilesAria: 'Поделиться файлами',
          fileFallbackName: 'файлами',
        },
        fileShare: {
          encryptingSingle: 'Шифруется копия файла...',
          encryptingMultiple: 'Шифруется копия файлов...',
          complete: 'Шифрование завершено',
        },
        typing: {
          one: '{{name}} печатает...',
          two: '{{first}} и {{second}} печатают...',
          many: 'Несколько человек печатают...',
        },
        verification: {
          failed: 'Проверка {{name}} не удалась',
          timedOut: 'Время проверки {{name}} истекло',
          unverifiedTooltip:
            'Этого человека не удалось проверить с помощью криптографии с открытым ключом. Он может выдавать себя за другого. Будьте осторожны с тем, чем делитесь.',
          verifiedTooltip:
            'Этот человек был проверен с помощью криптографии с открытым ключом',
          verifyingTooltip: 'Проверка этого человека...',
          publicKey: 'Их открытый ключ',
        },
        connection: {
          directTo: 'Вы подключены напрямую к {{name}}',
          relayedTo:
            'Вы подключены к {{name}} через relay-сервер. Соединение по-прежнему приватное и зашифрованное, но производительность может быть ниже.',
        },
        audio: {
          peerMicrophoneVolume: 'Громкость их микрофона',
          peerScreenVolume: 'Громкость их экрана',
          volume: 'Громкость',
        },
        download: {
          tooltip: 'Скачать файлы, которые предлагает {{name}}',
        },
      },
      peerList: {
        close: 'Закрыть список участников',
        list: 'Список участников',
        show: 'Нажмите, чтобы показать список участников',
        searching: 'Поиск участников...',
      },
      shell: {
        openMenu: 'Открыть меню',
        copyCurrentUrl: 'Скопировать текущий URL',
        showQrCode: 'Показать QR-код',
        hideRoomControls: 'Скрыть элементы управления комнаты',
        showRoomControls: 'Показать элементы управления комнаты',
        roomControlsAria: 'Показать элементы управления комнаты',
        exitFullscreen: 'Выйти из полноэкранного режима',
        enterFullscreen: 'Войти в полноэкранный режим',
        fullscreenAria: 'Полноэкранный режим',
        embeddedFooterPrefix: 'Этот разговор работает на базе',
        embeddedFooterLink: 'Chitchatter',
      },
      connectionStatus: {
        serverConnectionFailed: 'Не удалось подключиться к серверу',
        searching: 'Поиск серверов...',
        full: 'Подключено',
        partial: 'Подключено',
        none: 'Нет связи',
        fullTooltip:
          'Соединения можно установить со всеми участниками, у которых также есть полное подключение.',
        partialTooltip:
          'Relay-сервер недоступен. Соединения можно установить только если relay не нужен ни одной из сторон.',
        noneTooltip:
          'Сервер сопряжения недоступен. Соединения между участниками установить невозможно.',
      },
      userInfo: {
        changed: 'Имя пользователя изменено на "{{name}}"',
        reset: 'Имя пользователя сброшено',
        reveal: 'Показать информацию о пользователе',
        helper: 'Ваше имя пользователя',
        yourUsername: 'Ваше имя',
        publicKey: 'Ваш открытый ключ (сгенерирован локально):',
        privateKey:
          'Ваш закрытый ключ также сгенерирован локально, скрыт и существует только на вашем устройстве.',
        close: 'Закрыть',
      },
      copyable: {
        copied: 'Скопировано в буфер обмена',
        copy: 'Скопировать в буфер обмена',
      },
      messageForm: {
        placeholder: 'Ваше сообщение',
        send: 'Отправить',
      },
      init: {
        bootError:
          'Chitchatter не удалось запустить. Проверьте консоль браузера.',
      },
    },
  },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
})

export const getPreferredLanguage = (locale: string | undefined): Language => {
  const normalizedLocale = locale?.toLowerCase() ?? ''

  if (normalizedLocale.startsWith(Language.SPANISH)) {
    return Language.SPANISH
  }

  if (normalizedLocale.startsWith(Language.RUSSIAN)) {
    return Language.RUSSIAN
  }

  return defaultLanguage
}

export const getLanguageLabel = (language: Language) => {
  switch (language) {
    case Language.SPANISH:
      return i18n.t('languages.spanish')
    case Language.RUSSIAN:
      return i18n.t('languages.russian')
    case Language.ENGLISH:
    default:
      return i18n.t('languages.english')
  }
}

export default i18n

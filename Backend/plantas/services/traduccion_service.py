from deep_translator import GoogleTranslator, exceptions


class TraduccionError(Exception):
    pass

def traducir(text, target):
    try:
        traducir_texto = GoogleTranslator(
            source= "auto",
            target= target
        ).translate(text)
        return traducir_texto
    
    except exceptions.TooManyRequests:
        raise TraduccionError("Limite de traducciones alcanzadas")
    
    except exceptions.TranslationNotFound:
        raise TraduccionError("No se pudo traducir el texto")
    
    except exceptions.RequestError:
        raise TraduccionError("No se pudo conectar con el servidor de traducción")
    
    except Exception as e:
        raise TraduccionError(f"Error inesperado: {str(e)}")

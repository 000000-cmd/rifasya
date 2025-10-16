import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateLocation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const locationControl = control.get('location');
    if (!locationControl) return null;
    const location = locationControl.value;
    if (!location) { return null; }

    const isPartiallyIncomplete = !location.countryId || !location.departmentId || !location.municipalityId || !location.neighborhoodId;

    if (isPartiallyIncomplete) {
      const missingFields = [];
      if (!location.departmentId) missingFields.push('Departamento');
      if (!location.municipalityId) missingFields.push('Municipio');
      if (!location.neighborhoodId) missingFields.push('Barrio / Vereda');

      const error = {
        locationIncomplete: true,
        customError: 'Faltan campos de ubicación por diligenciar.',
        missing: missingFields
      };
      locationControl.setErrors({ ...locationControl.errors, ...error });
      return error;
    } else {
      if (locationControl.hasError('locationIncomplete')) {
        const currentErrors = { ...locationControl.errors };
        delete currentErrors['locationIncomplete'];
        delete currentErrors['customError'];
        delete currentErrors['missing'];
        locationControl.setErrors(Object.keys(currentErrors).length > 0 ? currentErrors : null);
      }
      return null;
    }
  };
}

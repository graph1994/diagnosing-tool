from diagnosing_tool.app.models import Diagnosis, Symptom
import csv
from os.path import abspath, exists

def run():
    print("---RUNNING IMPORT DATA SCRIPT---")
    import_data_from_csv()


def import_data_from_csv():
    full_path = abspath("scripts/symptoms.csv")
    reader = csv.reader(open(full_path), dialect='excel')
    for symptomWithDiagnosis in reader:
        symptom = Symptom.objects.create(feature=symptomWithDiagnosis[0])
        symptom.save()
        for diagnosisName in symptomWithDiagnosis[1:]:
            diagnosis = Diagnosis.objects.create(name=diagnosisName, symptom_id=symptom.id, frequency=0)
            diagnosis.save()

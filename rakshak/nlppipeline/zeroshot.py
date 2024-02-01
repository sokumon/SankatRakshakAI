from transformers import pipeline


def max_score(data):
    max_index = data['scores'].index(max(data['scores']))
    max_label = data['labels'][max_index]
    return max_label

def give_priority(sequence_to_classify):
    classifier = pipeline("zero-shot-classification",
                      model="facebook/bart-large-mnli")
    candidate_labels = ['low','high','medium']
    return max_score(classifier(sequence_to_classify, candidate_labels))

def give_type_of_emergency(sequence_to_classify):
    classifier = pipeline("zero-shot-classification",
                      model="facebook/bart-large-mnli")
    candidate_labels = ['medical','fire','crime-in-progress','other']
    return max_score(classifier(sequence_to_classify, candidate_labels))

# print(give_type_of_emergency("Help me i am stuck"))